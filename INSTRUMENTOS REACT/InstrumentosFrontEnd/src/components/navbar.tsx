import { useEffect, useState } from 'react';
import Usuario from '../entidades/Usuario'
import './css/navbar.css'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();


    const cerrarSesion = async () => {
        localStorage.setItem('usuario', "");
        localStorage.removeItem('usuario');
        navigate('/login', {
            replace: true,
            state: {
                logged: false
            },
        });
    }

    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;
    //console.log("rol user: ", usuarioLogueado.rol);

    const iniciarSesion = () => {
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark full-width navbar-personalizado fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand brand-pers" href="/home">HENDRIX</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/productos">Productos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/mapa">Donde estamos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/grilla">Grilla</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/charts">Graficos</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {usuarioLogueado ? (
                                <li className="nav-item me-3">
                                    <a className="nav-link text-light">Usuario: {usuarioLogueado?.nombreUsuario} | Rol: {usuarioLogueado?.rol}</a>
                                </li>
                            ) : null}
                            <li className="nav-item">
                                {usuarioLogueado ? (
                                    <button className='btn btn-danger' onClick={cerrarSesion}>Cerrar sesión</button>
                                ) : (
                                    <button className='btn btn-primary' onClick={iniciarSesion}>Iniciar sesión</button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
