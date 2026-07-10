import { useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabase'

// Revela un elemento cuando entra en viewport (para animaciones de entrada).
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px', ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, shown]
}

// Detecta breakpoint mobile (coincide con el @media max-width:620px de App.css),
// para elegir qué fuente de video/imagen cargar sin descargar ambas.
export function useIsMobile(query = '(max-width: 620px)') {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setIsMobile(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return isMobile
}

// Cuenta ascendente animada, se dispara al entrar en viewport.
export function useCountUp(target, { duration = 1600 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)
  const prevTarget = useRef(target)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targetChanged = prevTarget.current !== target
    prevTarget.current = target

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setValue(target)
      return
    }

    // Ya se animó una vez (p.ej. con el valor de fallback) y luego llegó el
    // valor real desde Supabase: no volver a animar, solo corregir el número.
    if (started.current && targetChanged) {
      setValue(target)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1)
              // easeOutCubic
              const eased = 1 - Math.pow(1 - p, 3)
              setValue(Math.round(target * eased))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return [ref, value]
}

// Lee el snapshot público de métricas (tabla `metricas_publicas`, proyecto Supabase
// separado de producción). Devuelve null mientras carga o si falla, para que el caller
// pueda quedarse con sus valores de fallback.
export function useMetricasPublicas() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let active = true
    supabase
      .from('metricas_publicas')
      .select('*')
      .eq('id', 1)
      .single()
      .then(({ data, error }) => {
        if (active && !error) setData(data)
      })
    return () => {
      active = false
    }
  }, [])

  return data
}

// Lee los destinos activos del mapa público (tabla `mapa_destinos_publico`).
export function useMapaDestinos() {
  const [data, setData] = useState([])

  useEffect(() => {
    let active = true
    supabase
      .from('mapa_destinos_publico')
      .select('*')
      .eq('activo', true)
      .then(({ data, error }) => {
        if (active && !error && data) setData(data)
      })
    return () => {
      active = false
    }
  }, [])

  return data
}

// Agrupa destinos por `zona` y recorre cada grupo de oeste a este (izquierda a
// derecha en el mapa), para que el trazo nunca salte de una ciudad a otra y
// vuelva. `zonaInicial` decide qué grupo se recorre primero; dentro de cada
// grupo el arranque es el punto más al oeste (menor longitud).
export function ordenarPorProximidad(destinos, zonaInicial) {
  if (!destinos.length) return destinos

  const puntos = destinos.map((d) => ({ ...d, lat: Number(d.lat), lng: Number(d.lng) }))
  const zonas = [...new Set(puntos.map((d) => d.zona))].sort((a, b) => {
    if (a === zonaInicial) return -1
    if (b === zonaInicial) return 1
    return 0
  })

  return zonas.flatMap((zona) =>
    puntos.filter((d) => d.zona === zona).sort((a, b) => a.lng - b.lng),
  )
}
