package com.example.InstrumentosBackEnd.servicio;

import java.util.List;

import com.example.InstrumentosBackEnd.modelo.Pedido;

public interface PedidoServicioImpl {

    List<Pedido> getAll();
    Pedido getById(Long id);
    void remove(Long id);
    Pedido save(Pedido pedido);

    //Workbook imprimirExcelPedidos(LocalDateTime fechaInicio, LocalDateTime fechaFin);
}
