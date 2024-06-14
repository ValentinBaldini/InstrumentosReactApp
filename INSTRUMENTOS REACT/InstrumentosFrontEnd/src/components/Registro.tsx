import { useNavigate } from "react-router-dom";
import Usuario from "../entidades/Usuario";
import { useState } from "react";
import InstrumentoService from "../services/InstrumentoService";

const Registro = () => {

    const navigate = useNavigate()

    const [usuario, setUser] = useState<Usuario>(new Usuario());

    const registrarUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await InstrumentoService.registrarUsuarios(usuario);
            if (typeof response === 'string') {
                // Credenciales inválidas
                console.log('Credenciales inválidas');
                alert("Error en el registro, intente devuelta")
            } else if (response && typeof response === 'object') {
                localStorage.setItem('usuario', JSON.stringify(usuario));
                console.log(localStorage.getItem('usuario'));
                // Login exitoso
                console.log('Registro exitoso');
                navigate('/home', {
                    replace: true,
                    state: {
                        logged: true,
                        usuario: usuario
                    },
                });
            }
        } catch (error) {
            console.error('Error en el registro', error);
            alert("Error en el registro, intente devuelta")
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...usuario, [name]: value });
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rolUser = e.target.value;
        setUser({
            ...usuario,
            rol: rolUser
        });
    }



    return (
        <div>
            <>
                <div>
                    <div className="wrapperLogin">
                        <form className="form-signin" onSubmit={registrarUsuario}>
                            <h2 className="form-signin-heading">Registro</h2>
                            <input
                                type="text"
                                className="form-control"
                                name="nombreUsuario"
                                placeholder="Nombre de usuario"
                                defaultValue={usuario.nombreUsuario}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                className="form-control"
                                name="clave"
                                placeholder="Clave"
                                defaultValue={usuario.clave}
                                onChange={handleChange}
                                required
                            />
                            <select className="form-select"
                                id="rol"
                                name="rol"
                                defaultValue={usuario.rol}
                                onChange={handleChangeSelect}
                                required>
                                <option selected disabled value="">Elija una opcion</option>
                                <option value="Admin">Admin</option>
                                <option value="Operador">Operador</option>
                                <option value="Visor">Visor</option>
                            </select>
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Registrar</button>
                            <br></br>
                        </form>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Registro
