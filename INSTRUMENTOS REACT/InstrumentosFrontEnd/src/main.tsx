import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListaInstrumentos from './components/ListaInstrumentos.tsx'
import Home from './components/Home.tsx'
import DetalleInstrumento from './components/DetalleInstrumento.tsx'
import Mapa from './components/Mapa.tsx'
import GrillaInstrumentos from './components/grillaInstrumentos.tsx'
import Formulario from './components/Formulario.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home></Home>}></Route>
        <Route path='/productos' element={<ListaInstrumentos></ListaInstrumentos>}></Route>
        <Route path="/instrumentos">
          <Route path=':idInstrumento' element={<DetalleInstrumento></DetalleInstrumento>}></Route>
        </Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/mapa' element={<Mapa></Mapa>}></Route>
        <Route path='/grilla' element={<GrillaInstrumentos></GrillaInstrumentos>}></Route>
        <Route path="/formulario">
          <Route path=':idInstrumento' element={<Formulario></Formulario>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
