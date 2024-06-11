package com.example.InstrumentosBackEnd.servicio;

import com.example.InstrumentosBackEnd.modelo.Instrumento;
import com.example.InstrumentosBackEnd.repositorio.InstrumentoRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentoServicio implements InstrumentoServiceImpl{

    @Autowired
    private InstrumentoRepositorio instrumentoRepositorio;

    @Override
    public List<Instrumento> getAll(){
        return (List<Instrumento>)instrumentoRepositorio.findAll();
    }

    @Override
    public Instrumento getById(Long id) {
        return (Instrumento) instrumentoRepositorio.findById(id).get();
    }

    @Override
    public void remove(Long id){
        instrumentoRepositorio.deleteById(id);
    }

    @Override
    public void save(Instrumento instrumento){
        instrumentoRepositorio.save(instrumento);
    }
}
