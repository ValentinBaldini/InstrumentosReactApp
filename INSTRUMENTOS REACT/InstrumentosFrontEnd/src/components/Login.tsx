import React, { useState } from 'react'
import './css/Login.css'
import Usuario from '../entidades/Usuario'
import InstrumentoService from '../services/InstrumentoService';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUsuario({
            ...usuario,
            [name]: value
        });
    };

    /*const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rolUser = e.target.value;
        setUsuario({
            ...usuario,
            rol: rolUser
        });
    }*/

    const loginUsuarios = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await InstrumentoService.loginUsuarios(usuario);
            if (typeof response === 'string') {
                // Credenciales inválidas
                console.log('Credenciales inválidas');
                alert("Error en el login, intente de nuevo");
            } else if (response && typeof response === 'object') {
                localStorage.setItem('usuario', JSON.stringify(response));
                console.log(localStorage.getItem('usuario'));
                console.log(response);
                // Login exitoso
                console.log('Login exitoso');
                navigate('/home', {
                    replace: true,
                    state: {
                        logged: true,
                        usuario: response
                    },
                });
            }
        } catch (error) {
            console.error('Error en el login', error);
            alert("Error en el login, intente de nuevo");
        }
    };



    return (
        <>
            <div>
                <div className="wrapperLogin">
                    <form className="form-signin" onSubmit={loginUsuarios}>
                        <h2 className="form-signin-heading">Login</h2>
                        <input
                            type="text"
                            className="form-control"
                            name="nombreUsuario"
                            placeholder="Nombre de usuario"
                            defaultValue={usuario.nombreUsuario}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            className="form-control"
                            name="clave"
                            placeholder="Clave"
                            defaultValue={usuario.clave}
                            onChange={handleChange}
                        />
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                        <br></br>
                        <a href="/registro">Registrar Usuario</a>
                    </form>
                </div>
                <a href="/home">Volver al inicio</a>
            </div>
        </>
    )
}

export default Login
