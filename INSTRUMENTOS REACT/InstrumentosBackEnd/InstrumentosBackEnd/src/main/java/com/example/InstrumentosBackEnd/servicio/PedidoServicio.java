package com.example.InstrumentosBackEnd.servicio;

import com.example.InstrumentosBackEnd.modelo.Pedido;
import com.example.InstrumentosBackEnd.repositorio.PedidoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PedidoServicio implements PedidoServicioImpl{
    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    @Override
    public List<Pedido> getAll(){
        return (List<Pedido>)pedidoRepositorio.findAll();
    }

    @Override
    public Pedido getById(Long id) {
        return (Pedido) pedidoRepositorio.findById(id).get();
    }

    @Override
    public void remove(Long id){
        pedidoRepositorio.deleteById(id);
    }

    @Override
    public Pedido save(Pedido pedido){
        pedidoRepositorio.save(pedido);
        return pedido;
    }
}
