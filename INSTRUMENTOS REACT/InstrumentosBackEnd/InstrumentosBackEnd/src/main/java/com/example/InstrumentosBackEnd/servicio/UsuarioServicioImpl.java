package com.example.InstrumentosBackEnd.servicio;

import com.example.InstrumentosBackEnd.modelo.Usuario;

public interface UsuarioServicioImpl {
    Usuario getUserByName(String nombreUsuario);
    Usuario postUser(Usuario usuario);
    boolean validateUser(Usuario usuario);
} 

