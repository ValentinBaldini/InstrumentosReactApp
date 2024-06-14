import { useState } from "react";
import { Rol } from "../../entidades/Rol";
import Usuario from "../../entidades/Usuario";
import { Navigate, Outlet } from "react-router-dom";

interface Props{
    rol : Rol;
}

function RolUsuario({rol} : Props){
    const [jsonUsuario , setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado : Usuario = JSON.parse(jsonUsuario) as Usuario;

    if(usuarioLogueado && usuarioLogueado.rol === rol){
        return <Outlet></Outlet>
    }else if(usuarioLogueado){
        return <Navigate replace to="/grilla"></Navigate>
    }else{
        return <Navigate replace to="/login"></Navigate>
    }
}

export default RolUsuario
