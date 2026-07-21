import { supabase } from './supabase'

function detectarDispositivo(ua) {
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  if (/mobi|android|iphone/i.test(ua)) return 'movil'
  return 'escritorio'
}

function detectarNavegador(ua) {
  if (/edg\//i.test(ua)) return 'Edge'
  if (/opr\/|opera/i.test(ua)) return 'Opera'
  if (/chrome|crios/i.test(ua) && !/edg\//i.test(ua)) return 'Chrome'
  if (/fxios|firefox/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua) && !/chrome|crios|android/i.test(ua)) return 'Safari'
  return 'otro'
}

// Registra un clic en un CTA de WhatsApp (solo dispositivo/navegador, sin IP).
export function registrarClicWhatsapp(origen) {
  const ua = navigator.userAgent || ''
  supabase
    .from('clics_whatsapp')
    .insert({
      dispositivo: detectarDispositivo(ua),
      navegador: detectarNavegador(ua),
      origen,
    })
    .then(({ error }) => {
      if (error) console.error('No se pudo registrar el clic de WhatsApp:', error)
    })
}
