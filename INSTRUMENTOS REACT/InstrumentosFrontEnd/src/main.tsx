import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CarritoCompra from './components/CarritoCompra.tsx'
import Home from './components/Home.tsx'
import DetalleInstrumento from './components/DetalleInstrumento.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<CarritoCompra></CarritoCompra>}></Route>
        <Route path='/detalleInstrumento/:id' element={<DetalleInstrumento></DetalleInstrumento>}></Route>
        <Route path='/Home' element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
