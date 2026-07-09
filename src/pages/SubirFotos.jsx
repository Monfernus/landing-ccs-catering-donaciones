import { useEffect, useState } from 'react'
import { isHeic, normalizeHeic, uploadImagenGaleria } from '../lib/imageUpload'

const SESSION_KEY = 'subir-fotos-auth'
const UPLOAD_PASSWORD = import.meta.env.VITE_UPLOAD_PASSWORD

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
    <div style={{ maxWidth: 360, margin: '80px auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 18, marginBottom: 16 }}>Carga de fotos — acceso</h1>
      <form onSubmit={submit}>
        <input
          type="password"
          autoFocus
          value={clave}
          onChange={(e) => { setClave(e.target.value); setError(false) }}
          placeholder="Clave"
          style={{ width: '100%', padding: 10, fontSize: 16, boxSizing: 'border-box' }}
        />
        {error && <p style={{ color: 'crimson', fontSize: 13, marginTop: 8 }}>Clave incorrecta.</p>}
        <button type="submit" style={{ marginTop: 12, width: '100%', padding: 10, fontSize: 16 }}>
          Entrar
        </button>
      </form>
    </div>
  )
}

function Item({ file, onDone }) {
  const [preview, setPreview] = useState(null)
  const [status, setStatus] = useState('pendiente') // pendiente | subiendo | ok | error
  const [result, setResult] = useState(null)

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

  async function subir() {
    setStatus('subiendo')
    try {
      const r = await uploadImagenGaleria(file)
      setResult(r)
      setStatus('ok')
      onDone?.(r)
    } catch (err) {
      setResult({ error: err.message })
      setStatus('error')
    }
  }

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
      {preview && <img src={preview} alt="" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 6 }} />}
      <div style={{ flex: 1, fontSize: 13 }}>
        <div>{file.name}{isHeic(file) ? ' (HEIC → WebP)' : ''}</div>
        <div style={{ color: '#666' }}>Original: {Math.round(file.size / 1024)} KB</div>
        {status === 'ok' && (
          <div style={{ color: 'green', wordBreak: 'break-all' }}>
            ✓ Subida ({result.sizeKb} KB) — <a href={result.url} target="_blank" rel="noreferrer">{result.url}</a>
          </div>
        )}
        {status === 'error' && <div style={{ color: 'crimson' }}>Error: {result.error}</div>}
      </div>
      <button onClick={subir} disabled={status === 'subiendo' || status === 'ok'} style={{ padding: '8px 14px' }}>
        {status === 'subiendo' ? 'Subiendo…' : status === 'ok' ? 'Listo' : 'Subir'}
      </button>
    </div>
  )
}

function Uploader() {
  const [files, setFiles] = useState([])
  const [urls, setUrls] = useState([])

  function onPick(e) {
    setFiles([...files, ...Array.from(e.target.files || [])])
    e.target.value = ''
  }

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', padding: 24, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 18, marginBottom: 4 }}>Carga de fotos — galería (provisional)</h1>
      <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
        Selecciona una o varias fotos (HEIC/JPG/PNG). Se convierten a WebP y se suben al bucket público
        <code> galeria</code>. Copia la URL resultante para usarla en el código de la landing.
      </p>
      <label style={{ display: 'block', border: '2px dashed #ccc', borderRadius: 8, padding: 24, textAlign: 'center', cursor: 'pointer', marginBottom: 16 }}>
        📷 Elegir imágenes
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
          onChange={onPick}
          style={{ display: 'none' }}
        />
      </label>
      {files.map((f, i) => (
        <Item
          key={`${f.name}-${i}`}
          file={f}
          onDone={(r) => setUrls((u) => [...u, r.url])}
        />
      ))}
      {urls.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 14 }}>URLs subidas</h2>
          <textarea
            readOnly
            value={urls.join('\n')}
            style={{ width: '100%', height: 100, fontSize: 12, fontFamily: 'monospace' }}
          />
        </div>
      )}
    </div>
  )
}

export default function SubirFotos() {
  const [ok, setOk] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  if (!UPLOAD_PASSWORD) {
    return (
      <div style={{ maxWidth: 480, margin: '80px auto', padding: 24, fontFamily: 'sans-serif' }}>
        Falta configurar <code>VITE_UPLOAD_PASSWORD</code> en el entorno.
      </div>
    )
  }

  return ok ? <Uploader /> : <ClaveAcceso onOk={() => setOk(true)} />
}
