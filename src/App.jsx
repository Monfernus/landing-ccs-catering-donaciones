import './App.css'
import {
  Nav,
  Hero,
  Operacion,
  Impacto,
  Beneficiarios,
  Motivacion,
  ComoFunciona,
  Faq,
  Cierre,
  Footer,
} from './components/sections'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Operacion />
        <Impacto />
        <Beneficiarios />
        <Motivacion />
        <ComoFunciona />
        <Cierre />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
