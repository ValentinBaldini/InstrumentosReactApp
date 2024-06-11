package com.example.InstrumentosBackEnd.servicio;

import com.example.InstrumentosBackEnd.modelo.PedidoDetalle;
import com.example.InstrumentosBackEnd.repositorio.PedidoDetalleRepositorio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoDetalleServicio implements PedidoDetalleImpl{

    @Autowired
    private PedidoDetalleRepositorio pedidoDetalleRepositorio;

    @Override
    public List<PedidoDetalle> getAll(){
        return (List<PedidoDetalle>)pedidoDetalleRepositorio.findAll();
    }

    @Override
    public PedidoDetalle getById(Long id) {
        return (PedidoDetalle) pedidoDetalleRepositorio.findById(id).get();
    }

    @Override
    public void remove(Long id){
        pedidoDetalleRepositorio.deleteById(id);
    }

    @Override
    public PedidoDetalle save(PedidoDetalle pedidoDetalle){
        pedidoDetalleRepositorio.save(pedidoDetalle);
        return pedidoDetalle;
    }
    @Override
    public List<PedidoDetalle> saveAll(List<PedidoDetalle> pedidoDetalles) {
        pedidoDetalleRepositorio.saveAll(pedidoDetalles);
        return pedidoDetalles;
    }
}
