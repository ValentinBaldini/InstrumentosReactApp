package com.example.InstrumentosBackEnd.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.InstrumentosBackEnd.modelo.Categoria;

@Repository
public interface CategoriaRepositorio extends JpaRepository<Categoria,Long>{
    
}
