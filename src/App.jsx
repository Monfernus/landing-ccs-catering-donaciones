import logo from './assets/logotipo-letter-white.png'
import './App.css'

export default function App() {
  return (
    <main className="page">
      <div className="pattern" aria-hidden="true" />
      <div className="glow glow-1" aria-hidden="true" />
      <div className="glow glow-2" aria-hidden="true" />

      <header className="brand">
        <img src={logo} alt="CCS.Catering" className="logo" />
      </header>

      <section className="content">
        <span className="eyebrow">
          <span className="dot" />
          Plataforma en construcción
        </span>

        <h1 className="title">
          Cada aporte
          <br />
          se transforma <span className="accent">en ayuda.</span>
        </h1>

        <div className="subtitle">
          <p>
            Desde <strong>Caracas Catering</strong> estamos poniendo nuestra
            experiencia, nuestra cocina y nuestro equipo al servicio de quienes{' '}
            <strong>más lo necesitan.</strong>
          </p>
          <p>
            Estamos construyendo un espacio donde podrás conocer las donaciones
            recibidas, las comidas preparadas y las entregas realizadas durante
            esta operación.
          </p>
          <p className="quote">
            Porque ayudar también significa hacerlo con{' '}
            <span className="italic">responsabilidad, transparencia y respeto.</span>
          </p>
        </div>

        <div className="meta">
          <div className="meta-item">
            <span className="meta-label">Iniciativa</span>
            <span className="meta-value">
              <span className="meta-dot" />
              Respuesta solidaria de CCS.Catering
            </span>
          </div>
          <div className="divider" />
          <div className="meta-item">
            <span className="meta-label">Estado</span>
            <span className="meta-value">En construcción</span>
          </div>
          <div className="divider" />
          <div className="meta-item">
            <span className="meta-label">Contacto</span>
            <a
              className="meta-value link"
              href="https://www.instagram.com/caracascatering"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="ig-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @caracascatering
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} CCS.Catering — Todos los derechos reservados.</span>
        <span className="footer-tag">
          <span className="italic">Cocina, equipo y corazón —</span> al servicio
          de Venezuela.
        </span>
      </footer>
    </main>
  )
}
