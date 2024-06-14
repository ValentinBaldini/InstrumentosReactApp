package com.example.InstrumentosBackEnd.repositorio;

import com.example.InstrumentosBackEnd.modelo.Pedido;
import com.example.InstrumentosBackEnd.modelo.DTO.PedidoInstrumentoDTO;
import com.example.InstrumentosBackEnd.modelo.DTO.PedidosPorMesAnioDTO;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepositorio extends JpaRepository<Pedido,Long> {

    @Query(value = "SELECT * FROM Pedido " +
            "WHERE fecha_actual BETWEEN :fechaInicio AND :fechaFin",
            nativeQuery = true)
    List<Pedido> findPedidosEntreFechas(@Param("fechaInicio") LocalDateTime fechaInicio, @Param("fechaFin") LocalDateTime fechaFin);

    @Query("SELECT new com.example.InstrumentosBackEnd.modelo.DTO.PedidoInstrumentoDTO(i.id, i.instrumento, COUNT(p)) " +
            "FROM Pedido p JOIN p.detallesPedido dp JOIN dp.instrumento i " +
            "GROUP BY i.id, i.instrumento")
    List<PedidoInstrumentoDTO> findCantidadPedidosAgrupadosPorInstrumento();

    @Query("SELECT new com.example.InstrumentosBackEnd.modelo.DTO.PedidosPorMesAnioDTO(MONTH(p.fechaPedido), COUNT(p)) " +
            "FROM Pedido p " +
            "WHERE YEAR(p.fechaPedido) = :anio " +
            "GROUP BY YEAR(p.fechaPedido), MONTH(p.fechaPedido) " +
            "ORDER BY YEAR(p.fechaPedido), MONTH(p.fechaPedido)")
    List<PedidosPorMesAnioDTO> countPedidosByYearAndMonth(@Param("anio") Integer anio);
}
