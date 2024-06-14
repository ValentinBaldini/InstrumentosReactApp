import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import ListaInstrumentos from './components/ListaInstrumentos.tsx'
import Home from './components/Home.tsx'
//import DetalleInstrumento from './components/DetalleInstrumento.tsx'
//import Mapa from './components/Mapa.tsx'
//import GrillaInstrumentos from './components/grillaInstrumentos.tsx'
//import Formulario from './components/Formulario.tsx'
import Login from './components/Login.tsx'
import Registro from './components/Registro.tsx'
import LoaderPage from './components/LoaderPage.tsx'
import { RutaPrivada } from './components/ControlAcceso/RutaPrivada.tsx'
import { Rol } from './entidades/Rol.ts'
import RolUsuario from './components/ControlAcceso/RolUsuario.tsx'
import Chart from './components/Chart.tsx'

const ListaInstrumentos = lazy(() => import('./components/ListaInstrumentos.tsx'));
const GrillaInstrumentos = lazy(() => import('./components/grillaInstrumentos.tsx'));
const Formulario = lazy(() => import('./components/Formulario.tsx'));
//const CheckoutMP = lazy(() => import('./components/CheckoutMP.tsx'));
const Mapa = lazy(() => import('./components/Mapa.tsx'));
const DetalleInstrumento = lazy(() => import('./components/DetalleInstrumento.tsx'));


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<LoaderPage></LoaderPage>}>
      <BrowserRouter>
        <Routes>
          //Publica
          <Route path='*' element={<Home></Home>}></Route>
          //Publica
          <Route path='/productos' element={<ListaInstrumentos></ListaInstrumentos>}></Route>
          //Publica
          <Route path="/instrumentos">
            <Route path=':idInstrumento' element={<DetalleInstrumento></DetalleInstrumento>}></Route>
          </Route>
          //Publica
          <Route path='/home' element={<Home></Home>}></Route>
          //Publica
          <Route path='/mapa' element={<Mapa></Mapa>}></Route>
          //Privada
          <Route path='/grilla' element={<RutaPrivada>
                                          <GrillaInstrumentos></GrillaInstrumentos>
                                        </RutaPrivada>
                                        }>
          </Route>
          //Privada y ADMIN
          <Route path="/formulario" element={<RolUsuario rol={Rol.ADMIN}></RolUsuario>}>
            <Route path=':idInstrumento' element= {<RutaPrivada>
                                                      <Formulario></Formulario>
                                                  </RutaPrivada>
                                                  }>
            </Route>
          </Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/registro' element={<Registro></Registro>}></Route>
          //Privada
          <Route path='/charts' element={<RutaPrivada>
                                          <Chart />
                                        </RutaPrivada>
                                        }>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)
