package com.example.InstrumentosBackEnd.repositorio;

import com.example.InstrumentosBackEnd.modelo.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoDetalleRepositorio extends JpaRepository<PedidoDetalle,Long> {
}
