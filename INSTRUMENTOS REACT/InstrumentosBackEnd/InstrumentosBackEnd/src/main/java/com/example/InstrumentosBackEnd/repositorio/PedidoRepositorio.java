package com.example.InstrumentosBackEnd.repositorio;

import com.example.InstrumentosBackEnd.modelo.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepositorio extends JpaRepository<Pedido,Long> {
}
