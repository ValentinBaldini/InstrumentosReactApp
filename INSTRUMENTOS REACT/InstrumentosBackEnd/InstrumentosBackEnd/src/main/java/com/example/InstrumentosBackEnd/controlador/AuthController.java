package com.example.InstrumentosBackEnd.controlador;

import java.util.Optional;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.InstrumentosBackEnd.modelo.Usuario;
import com.example.InstrumentosBackEnd.servicio.UsuarioServicio;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(path = "/api/auth")
public class AuthController {
    @Autowired
    private UsuarioServicio usuarioServicio;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            return ResponseEntity.status(HttpStatus.SC_OK).body(usuarioServicio.postUser(usuario));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND)
                    .body("{\"error\":\"Error. Por favor intente mas tarde.\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
        boolean isValidUser = usuarioServicio.validateUser(usuario);
        System.out.println("Usuario recibido: "+usuario.getNombreUsuario()+"Rol: "+usuario.getRol());
        if (isValidUser) {
            Usuario usuarioCompleto = usuarioServicio.getUserByName(usuario.getNombreUsuario());
            return ResponseEntity.status(HttpStatus.SC_OK).body(usuarioCompleto);
        } else {
            return ResponseEntity.status(HttpStatus.SC_NOT_FOUND)
                    .body("{\"error\":\"Usuario o contraseña incorrectos.\"}");
        }
    }
}