package com.example.InstrumentosBackEnd.servicio;

import com.example.InstrumentosBackEnd.modelo.Instrumento;
import java.util.List;

public interface InstrumentoServiceImpl {
    List<Instrumento> getAll();
    Instrumento getById(Long id);
    void remove(Long id);
    void save(Instrumento instrumento);
}
