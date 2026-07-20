// Parámetros de contacto de la iniciativa "Comidas con propósito".
export const CONTACTO = {
  whatsapp: '584126348567',
  instagram: 'caracascatering',
}

// Mensaje pre-cargado al abrir WhatsApp. Se puede personalizar por CTA.
export const waLink = (mensaje = 'Hola, quiero sumarme a Comidas con propósito de Caracas Catering.') =>
  `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}`

export const igLink = `https://instagram.com/${CONTACTO.instagram}`

// Instagram de cada aliado (logos de la sección 1 y el footer).
export const IG_ALIADOS = {
  caracas: 'https://www.instagram.com/caracascatering',
  laga: 'https://www.instagram.com/laga.gastronomia/',
  bocu: 'https://www.instagram.com/bocu.rest/',
  wck: 'https://www.instagram.com/wckitchen/',
}

// Video de fondo del hero, servido desde el bucket público `videos` (Supabase).
const STORAGE_VIDEOS = 'https://dbrudbicfevcqwlopwid.supabase.co/storage/v1/object/public/videos'
export const HERO_VIDEO = {
  desktop: `${STORAGE_VIDEOS}/banner-principal-desktop.mp4`,
  mobile: `${STORAGE_VIDEOS}/banner-principal-mobile.mp4`,
  posterDesktop: `${STORAGE_VIDEOS}/banner-principal-desktop-poster.jpg`,
  posterMobile: `${STORAGE_VIDEOS}/banner-principal-mobile-poster.jpg`,
}

// Bucket público `galeria` (Supabase) — fotos de la operación subidas por el equipo.
export const STORAGE_GALERIA = 'https://dbrudbicfevcqwlopwid.supabase.co/storage/v1/object/public/galeria'
