import { useState, useEffect, useRef, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import logoWhite from '../assets/logotipo-letter-white.png'
import isotipoWhite from '../assets/isotipo-bg-black.png' // emblema claro sobre transparente
import logoCaracasCatering from '../assets/logo caracas catering.png'
import logoLaga from '../assets/LOGO_LAGA-Horizontal.png'
import logoBocu from '../assets/logo bocu PRINCIPAL.png'
import logoCaracasCateringWhite from '../assets/logo-comidas-proposito-white-trim.png'
import logoLagaWhite from '../assets/LOGO_LAGA-Horizontal-white-trim.png'
import logoBocuWhite from '../assets/logo-bocu-white-trim.png'
import logoWck from '../assets/World_Central_Kitchen_logo.svg'
import { Cta, SectionTag, Dot, WhatsAppIcon } from './ui'
import {
  useReveal,
  useCountUp,
  useIsMobile,
  useMetricasPublicas,
  useMapaDestinos,
  useGaleriaCarrusel,
  ordenarPorProximidad,
} from '../hooks'
import { IMPACTO, BENEFICIARIOS, PASOS, FAQS } from '../data'
import { waLink, igLink, IG_ALIADOS, HERO_VIDEO, STORAGE_GALERIA } from '../config'

const pinIcon = L.divIcon({
  className: 'map-pin-icon',
  iconSize: [14, 14],
})

/* ============================ NAV ============================ */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand" aria-label="Comidas con propósito — Caracas Catering">
          <img src={logoWhite} alt="Caracas Catering" />
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="nav__cta"
        >
          <WhatsAppIcon size={16} />
          <span>Quiero ayudar</span>
        </a>
      </div>
    </header>
  )
}

/* ============================ HERO ============================ */
export function Hero() {
  const isMobile = useIsMobile()
  const src = isMobile ? HERO_VIDEO.mobile : HERO_VIDEO.desktop
  const poster = isMobile ? HERO_VIDEO.posterMobile : HERO_VIDEO.posterDesktop

  return (
    <section className="hero" id="top">
      <video
        className="hero__video"
        key={src}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner">
        <p className="hero__eyebrow reveal is-in">
          <Dot />
          <span className="hero__eyebrow-text">
            Comidas con propósito <span className="hero__eyebrow-sep">·</span>
            <br className="mobile-break" />
            <span className="ital"> una iniciativa de Caracas Catering</span>
          </span>
        </p>

        <h1 className="hero__title">
          <span className="line d1">Desde el primer día nuestros fogones han estado encendidos preparando comidas para <span className="accent">refugiados, rescatistas y voluntarios.</span></span>
        </h1>

        <div className="hero__cta d5">
          <Cta variant="white" mensaje="Hola, quiero convertir mi aporte en ayuda con Comidas con propósito.">
            Convierte tu aporte en ayuda
          </Cta>
        </div>
      </div>

      <a href="#operacion" className="hero__scroll" aria-label="Bajar">
        <span>Cómo funciona</span>
        <svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true">
          <path d="M7 1v18M1 13l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}

/* ==================== OPERACIÓN + ALIADOS ==================== */
export function Operacion() {
  const [ref, shown] = useReveal()
  return (
    <section className="section section--paper operacion" id="operacion">
      <div ref={ref} className={`wrap reveal ${shown ? 'is-in' : ''}`}>
        <div className="operacion__grid">
          <div className="operacion__text">
            <SectionTag n="01">La operación</SectionTag>
            <p className="lead">
              Tras los terremotos ocurridos en Venezuela el pasado miércoles 24 de junio,
              en <strong>Caracas Catering</strong> decidimos poner nuestra cocina, nuestra experiencia
              y nuestra capacidad operativa al servicio de las personas afectadas y de quienes
              trabajan incansablemente en las labores de rescate.
            </p>
            <p className="lead lead--muted">
              Junto a nuestros aliados, recibimos donaciones, preparamos alimentos y
              coordinamos su entrega de forma <span className="ital">organizada, segura y transparente.</span>
            </p>
            <p className="lead lead--muted">
              En esta operación también nos unimos en alianza con World Central Kitchen,
              organización internacional con amplia trayectoria en respuesta alimentaria ante
              emergencias. Su experiencia nos ayuda a fortalecer los criterios nutricionales de
              las comidas que servimos y a coordinar parte de las entregas en los puntos de atención.
            </p>
          </div>
          <div className="operacion__media">
            <img
              src="https://dbrudbicfevcqwlopwid.supabase.co/storage/v1/object/public/galeria/3cdd9e20-d888-4157-91ea-2dd0bf33868b.webp"
              alt="Operación de Comidas con propósito"
              loading="lazy"
            />
          </div>
        </div>

        <div className="allies">
          <div className="allies__viewport">
            <div className="allies__row">
              <div className="allies__group">
                <a href={IG_ALIADOS.caracas} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Caracas Catering">
                  <img className="ally-logo ally-logo--ccs" src={logoCaracasCatering} alt="Caracas Catering" />
                </a>
                <a href={IG_ALIADOS.laga} target="_blank" rel="noopener noreferrer" aria-label="Instagram de LAGA">
                  <img className="ally-logo ally-logo--laga" src={logoLaga} alt="LAGA" />
                </a>
                <a href={IG_ALIADOS.bocu} target="_blank" rel="noopener noreferrer" aria-label="Instagram de BOCU">
                  <img className="ally-logo ally-logo--bocu" src={logoBocu} alt="BOCU" />
                </a>
                <a href={IG_ALIADOS.wck} target="_blank" rel="noopener noreferrer" aria-label="Instagram de World Central Kitchen">
                  <img className="ally-logo ally-logo--wck" src={logoWck} alt="World Central Kitchen" />
                </a>
              </div>
              <div className="allies__group" aria-hidden="true">
                <a href={IG_ALIADOS.caracas} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
                  <img className="ally-logo ally-logo--ccs" src={logoCaracasCatering} alt="" />
                </a>
                <a href={IG_ALIADOS.laga} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
                  <img className="ally-logo ally-logo--laga" src={logoLaga} alt="" />
                </a>
                <a href={IG_ALIADOS.bocu} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
                  <img className="ally-logo ally-logo--bocu" src={logoBocu} alt="" />
                </a>
                <a href={IG_ALIADOS.wck} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
                  <img className="ally-logo ally-logo--wck" src={logoWck} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================== INDICADORES DE IMPACTO ==================== */
function Metric({ valor, sufijo, label }) {
  const [ref, value] = useCountUp(valor)
  return (
    <div className="metric" ref={ref}>
      <div className="metric__value">
        {value.toLocaleString('es-VE')}
        <span className="metric__suffix">{sufijo}</span>
      </div>
      <div className="metric__label">{label}</div>
    </div>
  )
}

const DESTINO_ZOOM = 14

function MapaDestinos({ destinos }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const mapRef = useRef(null)

  const ordenados = useMemo(() => ordenarPorProximidad(destinos, 'La Guaira'), [destinos])
  const active = ordenados[activeIndex]

  const bounds = useMemo(
    () => ordenados.map((d) => [Number(d.lat), Number(d.lng)]),
    [ordenados]
  )

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return
    if (!started) {
      if (bounds.length) {
        map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 0.9 })
      }
      return
    }
    if (!active) return
    map.flyTo([Number(active.lat), Number(active.lng)], DESTINO_ZOOM, { duration: 0.9 })
  }, [active, started, mapReady, bounds])

  if (!ordenados.length) return null

  const goTo = (delta) => {
    setActiveIndex((i) => (i + delta + ordenados.length) % ordenados.length)
  }

  const empezar = () => {
    setActiveIndex(0)
    setStarted(true)
  }

  return (
    <div className="impacto__map-wrap">
      <div className="impacto__map-inner">
        <div className="impacto__map-cta">
          <Cta mensaje="Hola, quiero sumarme a la operación de Comidas con propósito.">
            Súmate a la operación
          </Cta>
        </div>
        <MapContainer
          ref={mapRef}
          center={[Number(active.lat), Number(active.lng)]}
          zoom={DESTINO_ZOOM}
          className="impacto__leaflet"
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}
          whenReady={() => setMapReady(true)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
            maxZoom={19}
          />
          {ordenados.map((d) => (
            <Marker key={d.id} position={[Number(d.lat), Number(d.lng)]} icon={pinIcon}>
              {started && d.id === active.id && (
                <Tooltip
                  permanent
                  direction="top"
                  offset={[0, -6]}
                  opacity={1}
                  interactive={false}
                  className="impacto__map-popup"
                >
                  {d.nombre_generico}
                </Tooltip>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>

      {started ? (
        <div className="impacto__map-nav">
          <button
            type="button"
            className="impacto__map-nav-btn"
            onClick={() => goTo(-1)}
          >
            <span className="impacto__map-nav-arrow" aria-hidden="true">←</span>
            Volver
          </button>
          <button
            type="button"
            className="impacto__map-nav-btn"
            onClick={() => goTo(1)}
          >
            Siguiente
            <span className="impacto__map-nav-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      ) : (
        <div className="impacto__map-nav impacto__map-nav--start">
          <button
            type="button"
            className="impacto__map-nav-btn impacto__map-nav-btn--start"
            onClick={empezar}
          >
            Click acá para ver todos los puntos atendidos
          </button>
        </div>
      )}
    </div>
  )
}

export function Impacto() {
  const [ref, shown] = useReveal()
  const metricasDb = useMetricasPublicas()
  const destinos = useMapaDestinos()

  const metricas = IMPACTO.metricas.map((m) => {
    const dbValor = metricasDb?.[m.dbKey]
    return dbValor != null ? { ...m, valor: Math.round(Number(dbValor)) } : m
  })

  return (
    <section className="section section--dark impacto">
      <div ref={ref} className={`wrap reveal ${shown ? 'is-in' : ''}`}>
        <SectionTag n="02">Indicadores de impacto</SectionTag>
        <h2 className="section__title">
          La ayuda <span className="accent-ital">ya está llegando</span>
        </h2>

        <div className="metrics">
          {metricas.map((m) => (
            <Metric key={m.key} valor={m.valor} sufijo={m.sufijo} label={m.label} />
          ))}
        </div>

        <div className="impacto__map">
          <MapaDestinos destinos={destinos} />
        </div>
      </div>
    </section>
  )
}

/* ==================== BENEFICIARIOS ==================== */
export function Beneficiarios() {
  const [ref, shown] = useReveal()
  return (
    <section className="section section--paper beneficiarios">
      <div ref={ref} className={`wrap reveal ${shown ? 'is-in' : ''}`}>
        <SectionTag n="03">Beneficiarios de la operación</SectionTag>

        <div className="beneficiarios__grid">
          <div className="beneficiarios__media">
            <img
              src="https://dbrudbicfevcqwlopwid.supabase.co/storage/v1/object/public/galeria/b3ddeb05-53b3-4692-b05f-b45f645d9997.webp"
              alt="A quién ayudamos"
              loading="lazy"
            />
          </div>
          <div className="beneficiarios__text">
            <p className="section__intro">
              Lo que comenzó como una respuesta urgente está evolucionando hacia una
              plataforma de apoyo más amplia, que continuará funcionando mientras las
              comunidades afectadas y los equipos de respuesta lo necesiten.
            </p>

            <div className="benef__grid">
              {BENEFICIARIOS.map((b, i) => (
                <article className="benef-card" key={b.id}>
                  <span className="benef-card__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="benef-card__title">{b.titulo}</h3>
                  <p className="benef-card__copy">{b.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <p className="benef__closing">
          Las entregas se coordinan a través de <span className="ital">organizaciones,
          instituciones y referentes</span> que ya se encuentran trabajando en las zonas afectadas.
        </p>
      </div>
    </section>
  )
}

/* ==================== ¿QUÉ NOS MUEVE? ==================== */
export function Motivacion() {
  const [ref, shown] = useReveal()
  return (
    <section className="section section--dark motivacion">
      <div className="motivacion__emblem" aria-hidden="true">
        <img src={isotipoWhite} alt="" />
      </div>
      <div ref={ref} className={`wrap reveal ${shown ? 'is-in' : ''}`}>
        <SectionTag n="04">Lo que nos mueve</SectionTag>
        <div className="motivacion__grid">
          <h2 className="motivacion__title">
            Cocinar siempre ha sido nuestra manera <br className="d-desk" />
            de <span className="accent-ital">cuidar</span>
          </h2>
          <div className="motivacion__media">
            <img
              src="https://dbrudbicfevcqwlopwid.supabase.co/storage/v1/object/public/galeria/7c6d3ca5-e055-4369-b141-f2fbde8d2d52.webp"
              alt="Lo que nos mueve"
              loading="lazy"
            />
          </div>
          <div className="motivacion__body">
            <p>
              Durante años en Caracas Catering hemos utilizado la cocina para reunir,
              acompañar y celebrar. Hoy esa misma cocina tiene una misión distinta:
              alimentar, sostener y llevar un poco de alivio a quienes atraviesan uno de
              los momentos más difíciles de sus vidas.
            </p>
            <p>
              Ayudamos porque contamos con la infraestructura, el conocimiento y las
              personas capaces de hacerlo. Y porque, cuando existe la posibilidad de
              aportar, permanecer indiferentes <strong>no es una opción.</strong>
            </p>
          </div>
        </div>
        <p className="motivacion__quote">Hoy, cada comida tiene un propósito.</p>
      </div>
    </section>
  )
}

/* ==================== ¿CÓMO FUNCIONA? (stepper) ==================== */
export function ComoFunciona() {
  const [ref, shown] = useReveal()
  return (
    <section className="section section--paper comofunciona">
      <div ref={ref} className={`wrap reveal ${shown ? 'is-in' : ''}`}>
        <SectionTag n="05">El proceso</SectionTag>
        <h2 className="section__title dark">
          ¿Cómo funciona <span className="accent-ital">la ayuda?</span>
        </h2>

        <ol className="stepper">
          {PASOS.map((p) => (
            <li className="step" key={p.n}>
              <div className="step__marker">
                <span className="step__num">{p.n}</span>
              </div>
              <div className="step__content">
                <h3 className="step__title">{p.titulo}</h3>
                <p className="step__copy">{p.copy}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="section__cta">
          <Cta
            variant="dark"
            mensaje="Hola, quiero ayudar a que Comidas con propósito llegue más lejos."
          >
            Ayúdanos a llegar más lejos
          </Cta>
        </div>
      </div>
    </section>
  )
}

/* ==================== FAQ ==================== */
function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={`faq ${open ? 'faq--open' : ''}`}>
      <button className="faq__q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq__icon" aria-hidden="true" />
      </button>
      <div className="faq__a-wrap">
        <div className="faq__a">
          {(Array.isArray(a) ? a : [a]).map((parrafo, i) => (
            <p key={i}>{parrafo}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  const [ref, shown] = useReveal()
  return (
    <section className="section section--paper faqs">
      <div ref={ref} className={`wrap wrap--narrow reveal ${shown ? 'is-in' : ''}`}>
        <SectionTag n="06">FAQs</SectionTag>
        <h2 className="section__title dark">
          Preguntas Frecuentes
        </h2>

        <div className="faq__list">
          {FAQS.map((f, i) => (
            <FaqItem
              key={i}
              q={f.q}
              a={f.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>

        <div className="section__cta">
          <Cta
            variant="dark"
            mensaje="Hola, quiero unirme a la iniciativa Comidas con propósito."
          >
            Únete a esta iniciativa
          </Cta>
        </div>
      </div>
    </section>
  )
}

/* ==================== CIERRE (verde) ==================== */
export function Cierre() {
  const [ref, shown] = useReveal()
  return (
    <section className="section section--green cierre">
      <div ref={ref} className={`wrap reveal ${shown ? 'is-in' : ''}`}>
        <p className="cierre__kicker">Comidas con propósito</p>
        <h2 className="cierre__title">
          <span className="cierre__title-line">Tu ayuda puede convertirse en la</span>
          <span className="cierre__title-line">próxima comida que llegue a</span>
          <span className="cierre__title-line cierre__title-em">quien más lo necesita.</span>
        </h2>
        <p className="cierre__copy">
          Cada aporte, sin importar su tamaño, se suma a una operación organizada para
          producir y entregar alimentos donde más hacen falta.
        </p>
        <GaleriaCarrusel />
        <Cta
          variant="onGreen"
          mensaje="Hola, quiero ser parte de la respuesta de Comidas con propósito."
        >
          Sé parte de la respuesta
        </Cta>
      </div>
    </section>
  )
}

/* ==================== GALERÍA (carrusel infinito) ==================== */
function GaleriaCarrusel() {
  const nombres = useGaleriaCarrusel()
  const fotos = nombres.map((name) => `${STORAGE_GALERIA}/carrusel/${name}`)
  if (!fotos.length) return null
  const loop = [...fotos, ...fotos]
  return (
    <div className="galeria">
      <div className="galeria__viewport">
        <div className="galeria__track">
          {loop.map((src, i) => (
            <div className="galeria__item" key={i} aria-hidden={i >= fotos.length}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ==================== FOOTER ==================== */
export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" id="contacto">
      <div className="footer__top">
        <a href={IG_ALIADOS.caracas} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Caracas Catering">
          <img className="footer__logo" src={logoWhite} alt="Caracas Catering" />
        </a>

        <p className="footer__tag">
          <span>
            Una iniciativa impulsada por Caracas Catering, junto a Bocu, LAGA y
            aliados comprometidos con Venezuela.
          </span>
        </p>

        <div className="footer__allies">
          <a href={IG_ALIADOS.caracas} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Caracas Catering">
            <img className="ally-logo ally-logo--ccs" src={logoCaracasCateringWhite} alt="Comidas con propósito" />
          </a>
          <a href={IG_ALIADOS.laga} target="_blank" rel="noopener noreferrer" aria-label="Instagram de LAGA">
            <img className="ally-logo ally-logo--laga" src={logoLagaWhite} alt="LAGA" />
          </a>
          <a href={IG_ALIADOS.bocu} target="_blank" rel="noopener noreferrer" aria-label="Instagram de BOCU">
            <img className="ally-logo ally-logo--bocu" src={logoBocuWhite} alt="BOCU" />
          </a>
          <a href={IG_ALIADOS.wck} target="_blank" rel="noopener noreferrer" aria-label="Instagram de World Central Kitchen">
            <img className="ally-logo ally-logo--wck" src={logoWck} alt="World Central Kitchen" />
          </a>
        </div>

        <div className="footer__links">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="footer__link">
            <WhatsAppIcon size={15} />
            <span>Escríbenos por WhatsApp</span>
          </a>
          <a href={igLink} target="_blank" rel="noopener noreferrer" className="footer__link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>@caracascatering</span>
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {year} Caracas Catering. Todos los derechos reservados.</span>
        <span className="footer__made">
          <span className="ital">Cocina, equipo y corazón</span> — al servicio de Venezuela.
        </span>
      </div>
    </footer>
  )
}
