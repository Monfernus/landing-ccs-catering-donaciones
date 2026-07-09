import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SubirFotos from './pages/SubirFotos.jsx'
import './index.css'

const Root = window.location.pathname === '/subir-fotos' ? SubirFotos : App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
