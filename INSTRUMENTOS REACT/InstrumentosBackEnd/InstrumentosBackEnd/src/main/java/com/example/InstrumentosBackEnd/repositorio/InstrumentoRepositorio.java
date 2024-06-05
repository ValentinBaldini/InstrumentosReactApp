package com.example.InstrumentosBackEnd.repositorio;

import com.example.InstrumentosBackEnd.modelo.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstrumentoRepositorio extends JpaRepository<Instrumento,Long> {
}
