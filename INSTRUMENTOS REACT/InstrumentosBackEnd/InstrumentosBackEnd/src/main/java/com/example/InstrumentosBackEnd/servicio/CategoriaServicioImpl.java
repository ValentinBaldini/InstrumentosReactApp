package com.example.InstrumentosBackEnd.servicio;

import java.util.List;

import com.example.InstrumentosBackEnd.modelo.Categoria;

public interface CategoriaServicioImpl {
    List<Categoria> getAll();
    Categoria getById(Long id);
    void remove(Long id);
    void save(Categoria categoria);
}
