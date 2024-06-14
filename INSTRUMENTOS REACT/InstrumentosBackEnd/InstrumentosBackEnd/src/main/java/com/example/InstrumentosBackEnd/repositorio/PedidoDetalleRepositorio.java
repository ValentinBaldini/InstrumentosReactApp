package com.example.InstrumentosBackEnd.repositorio;

import com.example.InstrumentosBackEnd.modelo.PedidoDetalle;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoDetalleRepositorio extends JpaRepository<PedidoDetalle,Long> {
    
    List<PedidoDetalle> findByPedido_FechaPedidoBetween(Date fechaDesde, Date fechaHasta);
}
