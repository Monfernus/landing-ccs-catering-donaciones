import imageCompression from 'browser-image-compression'
import { supabase } from './supabase'

export function isHeic(file) {
  const n = (file.name || '').toLowerCase()
  return n.endsWith('.heic') || n.endsWith('.heif') || /heic|heif/i.test(file.type)
}

export async function normalizeHeic(file) {
  if (!isHeic(file)) return file
  const { heicTo, isHeic: isHeicCheck } = await import('heic-to')
  if (!(await isHeicCheck(file))) return file
  const blob = await heicTo({ blob: file, type: 'image/jpeg', quality: 0.9 })
  return new File([blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), { type: 'image/jpeg' })
}

const GALERIA_COMPRESSION = {
  maxSizeMB: 0.4,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: 'image/webp',
  initialQuality: 0.82,
}

// Ver docs/foto-heic-webp.md para el detalle del patrón HEIC→WebP.
export async function uploadImagenGaleria(file) {
  const normalized = await normalizeHeic(file)
  const compressed = await imageCompression(normalized, GALERIA_COMPRESSION)
  const name = `${crypto.randomUUID()}.webp`
  const { error } = await supabase.storage.from('galeria').upload(name, compressed, {
    contentType: 'image/webp',
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from('galeria').getPublicUrl(name)
  return { url: data.publicUrl, sizeKb: Math.round(compressed.size / 1024), name }
}
