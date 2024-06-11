package com.example.InstrumentosBackEnd.servicio;

import java.util.List;

import com.example.InstrumentosBackEnd.modelo.PedidoDetalle;

public interface PedidoDetalleImpl {
    List<PedidoDetalle> getAll();

    PedidoDetalle getById(Long id);

    void remove(Long id);

    PedidoDetalle save(PedidoDetalle instrumento);

    public List<PedidoDetalle> saveAll(List<PedidoDetalle> pedidoDetalles);
}
