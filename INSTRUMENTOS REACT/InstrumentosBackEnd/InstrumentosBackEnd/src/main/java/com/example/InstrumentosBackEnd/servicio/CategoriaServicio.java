package com.example.InstrumentosBackEnd.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.InstrumentosBackEnd.modelo.Categoria;
import com.example.InstrumentosBackEnd.repositorio.CategoriaRepositorio;

@Service
public class CategoriaServicio implements CategoriaServicioImpl{
    @Autowired
    private CategoriaRepositorio categoriaRepositorio;

    @Override
    public List<Categoria> getAll(){
        return (List<Categoria>)categoriaRepositorio.findAll();
    }

    @Override
    public Categoria getById(Long id) {
        return (Categoria) categoriaRepositorio.findById(id).get();
    }

    @Override
    public void remove(Long id){
        categoriaRepositorio.deleteById(id);
    }

    @Override
    public void save(Categoria categoria){
        categoriaRepositorio.save(categoria);
    }
}
