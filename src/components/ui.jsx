import { waLink } from '../config'
import { registrarClicWhatsapp } from '../lib/tracking'

// Ícono WhatsApp (glyph oficial simplificado).
export function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M17.47 14.38c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.65.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.44-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.65-1.56-.89-2.14-.23-.56-.47-.48-.65-.49l-.55-.01c-.19 0-.51.07-.77.36-.26.29-1.01.99-1.01 2.41s1.04 2.8 1.18 2.99c.14.19 2.04 3.12 4.95 4.37.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34zM12.02 21.5h-.01a9.44 9.44 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.44 9.44 0 0 1-1.45-5.04c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.42 9.42 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.48 9.47zm8.06-17.54A11.36 11.36 0 0 0 12.02.5C5.74.5.64 5.6.64 11.87c0 2.01.53 3.97 1.53 5.7L.5 23.5l6.08-1.6a11.34 11.34 0 0 0 5.44 1.39h.01c6.28 0 11.38-5.1 11.38-11.37 0-3.04-1.18-5.9-3.33-8.05z" />
    </svg>
  )
}

// Botón CTA — todos redirigen a WhatsApp.
export function Cta({ children, mensaje, variant = 'solid', className = '', origen = 'general' }) {
  return (
    <a
      href={waLink(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => registrarClicWhatsapp(origen)}
      className={`cta cta--${variant} ${className}`}
    >
      <WhatsAppIcon size={18} />
      <span>{children}</span>
      <svg className="cta__arrow" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

// Marcador de sección editorial: 01 / Título.
export function SectionTag({ n, children }) {
  return (
    <div className="section-tag">
      <span className="section-tag__num">{n}</span>
      <span className="section-tag__line" aria-hidden="true" />
      <span className="section-tag__label">{children}</span>
    </div>
  )
}

// Punto verde — síntesis del emblema de marca.
export function Dot({ className = '' }) {
  return <span className={`brand-dot ${className}`} aria-hidden="true" />
}
