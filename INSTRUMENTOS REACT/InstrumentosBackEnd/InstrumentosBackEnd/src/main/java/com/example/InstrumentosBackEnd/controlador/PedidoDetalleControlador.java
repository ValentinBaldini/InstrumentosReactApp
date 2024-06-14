package com.example.InstrumentosBackEnd.controlador;

import com.example.InstrumentosBackEnd.modelo.Instrumento;
import com.example.InstrumentosBackEnd.modelo.Pedido;
import com.example.InstrumentosBackEnd.modelo.PedidoDetalle;
import com.example.InstrumentosBackEnd.servicio.InstrumentoServiceImpl;
import com.example.InstrumentosBackEnd.servicio.PedidoDetalleImpl;
import com.example.InstrumentosBackEnd.servicio.PedidoServicioImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoDetalleControlador {

    @Autowired
    private PedidoDetalleImpl pedidoDetalleImpl;

    @Autowired
    private PedidoServicioImpl pedidoServicioImpl;

    @Autowired
    private InstrumentoServiceImpl instrumentoServiceImpl;

    @PostMapping("/detallePedidoAll")
    public List<PedidoDetalle> saveAll(@RequestBody List<PedidoDetalle> pedidoDetalles) {
        List<PedidoDetalle> savedDetalles = new ArrayList<>();

        for (PedidoDetalle pedidoDetalle : pedidoDetalles) {
        // Obtener y asignar pedido
        Pedido pedido = pedidoServicioImpl.getById(pedidoDetalle.getPedido().getId());
        if (pedido == null) {
            throw new IllegalArgumentException("Pedido no encontrado con ID: " + pedidoDetalle.getPedido().getId());
        }
        pedidoDetalle.setPedido(pedido);

        // Obtener y asignar instrumento
        Instrumento instrumento = instrumentoServiceImpl.getById(pedidoDetalle.getInstrumento().getId());
        if (instrumento == null) {
            throw new IllegalArgumentException("Instrumento no encontrado con ID: " + pedidoDetalle.getInstrumento().getId());
        }
        pedidoDetalle.setInstrumento(instrumento);

        // Actualizar cantidad vendida del instrumento
        int nuevaCantidadVendida = Integer.parseInt(instrumento.getCantidadVendida()) + pedidoDetalle.getCantidad();
        instrumento.setCantidadVendida(String.valueOf(nuevaCantidadVendida));
        instrumentoServiceImpl.save(instrumento);

        // Guardar el detalle de pedido
        PedidoDetalle savedDetalle = pedidoDetalleImpl.save(pedidoDetalle);
        savedDetalles.add(savedDetalle);
        }

        System.out.println(savedDetalles.toString());

        return savedDetalles;
    }

    @PostMapping("/detallePedido")
    public PedidoDetalle save(@RequestBody PedidoDetalle pedidoDetalle) {
        if (pedidoDetalle.getPedido() == null || pedidoDetalle.getPedido().getId() == null) {
            throw new IllegalArgumentException("ID del pedido no debe ser nulo");
        }

        Pedido pedido = pedidoServicioImpl.getById(pedidoDetalle.getPedido().getId());
        if (pedido == null) {
            throw new RuntimeException("Pedido no encontrado con ID: " + pedidoDetalle.getPedido().getId());
        }
        System.out.println("ID del Pedido: " + pedidoDetalle.getPedido().getId());
        pedidoDetalle.setPedido(pedido);

        if (pedidoDetalle.getInstrumento() == null || pedidoDetalle.getInstrumento().getId() == null) {
            throw new IllegalArgumentException("ID del instrumento no debe ser nulo");
        }
        Instrumento instrumento = instrumentoServiceImpl.getById(pedidoDetalle.getInstrumento().getId());
        if (instrumento == null) {
            throw new RuntimeException("Instrumento no encontrado con ID: " + pedidoDetalle.getInstrumento().getId());
        }
        pedidoDetalle.setInstrumento(instrumento);

        return pedidoDetalleImpl.save(pedidoDetalle);
    }

    @GetMapping("/detallePedido")
    public List<PedidoDetalle> getAll() {
        return pedidoDetalleImpl.getAll();
    }

    @GetMapping("/detallePedido/{id}")
    public PedidoDetalle getById(@PathVariable String id) {
        return pedidoDetalleImpl.getById(Long.parseLong(id));
    }

    @DeleteMapping("/detallePedido/{id}")
    public void remove(@PathVariable String id) {
        pedidoDetalleImpl.remove(Long.parseLong(id));
    }

    @PutMapping("/detallePedido/{id}")
    public void update(@PathVariable Long id, @RequestBody PedidoDetalle pedidoDetalle) {
        PedidoDetalle existingPedidoDetalle = pedidoDetalleImpl.getById(id);
        if (existingPedidoDetalle != null) {
            pedidoDetalle.setId(id);

            Pedido pedido = pedidoServicioImpl.getById(pedidoDetalle.getPedido().getId());
            pedidoDetalle.setPedido(pedido);

            Instrumento instrumento = instrumentoServiceImpl.getById(pedidoDetalle.getInstrumento().getId());
            pedidoDetalle.setInstrumento(instrumento);

            pedidoDetalleImpl.save(pedidoDetalle);
        } else {
            throw new RuntimeException("El pedidoDetalle con ID " + id + " no existe.");
        }
    }
}
