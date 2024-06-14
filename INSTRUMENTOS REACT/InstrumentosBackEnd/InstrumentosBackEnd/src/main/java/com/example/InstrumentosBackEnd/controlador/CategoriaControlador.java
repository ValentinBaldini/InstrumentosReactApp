package com.example.InstrumentosBackEnd.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.InstrumentosBackEnd.modelo.Categoria;
import com.example.InstrumentosBackEnd.servicio.CategoriaServicioImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(path = "/api")
public class CategoriaControlador {
     @Autowired
        private CategoriaServicioImpl categoriaServicioImpl;

        @GetMapping("/categorias")
        public List<Categoria> getAll(){
            return categoriaServicioImpl.getAll();
        }

        @GetMapping("/categorias/{id}")
        private Categoria getById(@PathVariable String id){ return categoriaServicioImpl.getById(Long.parseLong(id));}

        @DeleteMapping("/categorias/{id}")
        public void remove(@PathVariable String id){
            categoriaServicioImpl.remove(Long.parseLong(id));
        }

        @PostMapping("/categorias")
        public void save(@RequestBody Categoria categoria){
            categoriaServicioImpl.save(categoria);
        }

}
