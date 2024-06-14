package com.example.InstrumentosBackEnd.servicio;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.example.InstrumentosBackEnd.modelo.Pedido;

public interface PedidoServicioImpl {

    List<Pedido> getAll();
    Pedido getById(Long id);
    void remove(Long id);
    Pedido save(Pedido pedido);

    Workbook imprimirExcelPedidos(LocalDateTime fechaInicio, LocalDateTime fechaFin);
}
