import { useEffect, useMemo, useRef, useState } from 'react'
import { isHeic, normalizeHeic, uploadImagenGaleria, CARRUSEL_FOLDER } from '../lib/imageUpload'
import logoWhite from '../assets/logotipo-letter-white.png'
import isotipoWhite from '../assets/isotipo-bg-black.png'
import './SubirFotos.css'

const SESSION_KEY = 'subir-fotos-auth'
const UPLOAD_PASSWORD = import.meta.env.VITE_UPLOAD_PASSWORD

/* ---------- iconos inline ---------- */
function IconUpload(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  )
}
function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round" width="20" height="20" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

/* ==================== PANTALLA DE ACCESO ==================== */
function ClaveAcceso({ onOk }) {
  const [clave, setClave] = useState('')
  const [error, setError] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (clave === UPLOAD_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onOk()
    } else {
      setError(true)
    }
  }

  return (
    <div className="subir subir--auth">
      <div className="subir__auth">
        <img className="subir__auth-emblem" src={isotipoWhite} alt="Caracas Catering" />
        <h1>Carga de fotos</h1>
        <p>Introduce la clave para gestionar el carrusel.</p>
        <form onSubmit={submit}>
          <div className="subir__field">
            <input
              className={`subir__input ${error ? 'is-error' : ''}`}
              type="password"
              autoFocus
              value={clave}
              onChange={(e) => { setClave(e.target.value); setError(false) }}
              placeholder="Clave de acceso"
            />
          </div>
          <p className="subir__error-msg">{error ? 'Clave incorrecta. Intenta de nuevo.' : ''}</p>
          <button type="submit" className="subir__btn subir__btn--primary">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

/* ==================== TARJETA DE FOTO ==================== */
function Card({ item, onRemove }) {
  const { file, status, result } = item
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    let revoke
    let cancelled = false
    ;(async () => {
      const jpg = isHeic(file) ? await normalizeHeic(file) : file
      if (cancelled) return
      const url = URL.createObjectURL(jpg)
      revoke = url
      setPreview(url)
    })()
    return () => {
      cancelled = true
      if (revoke) URL.revokeObjectURL(revoke)
    }
  }, [file])

  const badge = {
    pendiente: <span className="subir__badge subir__badge--pend">En cola</span>,
    subiendo: <span className="subir__badge subir__badge--up"><span className="subir__spin" />Subiendo</span>,
    ok: <span className="subir__badge subir__badge--ok"><IconCheck width="11" height="11" strokeWidth="3" />Lista</span>,
    error: <span className="subir__badge subir__badge--err">Error</span>,
  }[status]

  return (
    <li className={`subir__card is-${status === 'subiendo' ? 'up' : status === 'ok' ? 'ok' : status === 'error' ? 'error' : 'pend'}`}>
      {preview
        ? <img src={preview} alt={file.name} />
        : <div className="subir__card-skeleton" />}
      {badge}
      {status === 'pendiente' && (
        <button
          type="button"
          className="subir__remove"
          onClick={onRemove}
          aria-label="Quitar foto"
          title="Quitar"
        >×</button>
      )}
      <div className="subir__card-overlay">
        <span className="subir__card-name">
          {status === 'error' ? (result?.error || 'Falló la subida') : file.name}
        </span>
      </div>
    </li>
  )
}

/* ==================== UPLOADER ==================== */
function Uploader() {
  const [items, setItems] = useState([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const addFiles = (fileList) => {
    const nuevos = Array.from(fileList || []).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.round(file.size % 9973)}`,
      file,
      status: 'pendiente',
      result: null,
    }))
    setItems((prev) => {
      const vistos = new Set(prev.map((i) => i.id))
      return [...prev, ...nuevos.filter((n) => !vistos.has(n.id))]
    })
  }

  const onPick = (e) => {
    addFiles(e.target.files)
    e.target.value = ''
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id))

  const setStatus = (id, status, result = null) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status, result } : i)))

  const subirUno = async (item) => {
    setStatus(item.id, 'subiendo')
    try {
      const r = await uploadImagenGaleria(item.file, CARRUSEL_FOLDER)
      setStatus(item.id, 'ok', r)
    } catch (err) {
      setStatus(item.id, 'error', { error: err.message })
    }
  }

  const subirTodas = async () => {
    const pendientes = items.filter((i) => i.status === 'pendiente' || i.status === 'error')
    for (const item of pendientes) {
      // eslint-disable-next-line no-await-in-loop
      await subirUno(item)
    }
  }

  const stats = useMemo(() => {
    const total = items.length
    const ok = items.filter((i) => i.status === 'ok').length
    const pend = items.filter((i) => i.status === 'pendiente' || i.status === 'error').length
    const subiendo = items.some((i) => i.status === 'subiendo')
    return { total, ok, pend, subiendo }
  }, [items])

  return (
    <div className="subir">
      <div className="subir__inner">
        <div className="subir__brand">
          <img src={logoWhite} alt="Caracas Catering" />
          <span className="subir__brand-tag">Carrusel</span>
        </div>

        <h1 className="subir__title">
          Sube fotos al <em>carrusel</em>
        </h1>
        <p className="subir__lead">
          Las imágenes se optimizan a WebP y aparecen automáticamente en el carrusel de la
          landing. Las más recientes se muestran primero.
        </p>

        <label
          className={`subir__drop ${dragging ? 'is-drag' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <IconUpload className="subir__drop-icon" />
          <span className="subir__drop-title">Arrastra tus fotos aquí</span>
          <span className="subir__drop-hint">o haz clic para elegir · JPG · PNG · HEIC</span>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
            onChange={onPick}
          />
        </label>

        {items.length > 0 && (
          <>
            <div className="subir__bar">
              <span className="subir__count">
                <b>{stats.ok}</b> subidas · <b>{stats.pend}</b> en cola
              </span>
              {stats.pend > 0 && (
                <button
                  type="button"
                  className="subir__btn subir__btn--ghost"
                  onClick={() => setItems((prev) => prev.filter((i) => i.status !== 'pendiente'))}
                  disabled={stats.subiendo}
                >
                  Limpiar cola
                </button>
              )}
              <button
                type="button"
                className="subir__btn subir__btn--primary"
                onClick={subirTodas}
                disabled={stats.subiendo || stats.pend === 0}
              >
                {stats.subiendo ? 'Subiendo…' : `Subir ${stats.pend > 0 ? stats.pend : ''} ${stats.pend === 1 ? 'foto' : 'fotos'}`}
              </button>
            </div>

            <ul className="subir__grid">
              {items.map((item) => (
                <Card key={item.id} item={item} onRemove={() => removeItem(item.id)} />
              ))}
            </ul>

            {stats.total > 0 && stats.pend === 0 && !stats.subiendo && (
              <div className="subir__done">
                <IconCheck />
                <span>
                  ¡Listo! {stats.ok} {stats.ok === 1 ? 'foto está' : 'fotos están'} en el carrusel.
                  Recarga la landing para verlas.
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function SubirFotos() {
  const [ok, setOk] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  if (!UPLOAD_PASSWORD) {
    return (
      <div className="subir subir--auth">
        <p className="subir__missing">
          Falta configurar <code>VITE_UPLOAD_PASSWORD</code> en el entorno.
        </p>
      </div>
    )
  }

  return ok ? <Uploader /> : <ClaveAcceso onOk={() => setOk(true)} />
}
