package com.example.InstrumentosBackEnd.controlador;

import com.example.InstrumentosBackEnd.modelo.Instrumento;
import com.example.InstrumentosBackEnd.modelo.Pedido;
import com.example.InstrumentosBackEnd.modelo.PedidoDetalle;
import com.example.InstrumentosBackEnd.servicio.InstrumentoServiceImpl;
import com.example.InstrumentosBackEnd.servicio.PedidoDetalleImpl;
import com.example.InstrumentosBackEnd.servicio.PedidoServicioImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        for (PedidoDetalle pedidoDetalle : pedidoDetalles) {
            Pedido pedido = pedidoServicioImpl.getById(pedidoDetalle.getPedido().getId());
            pedidoDetalle.setPedido(pedido);

            Instrumento instrumento = instrumentoServiceImpl.getById(pedidoDetalle.getInstrumento().getId());
            pedidoDetalle.setInstrumento(instrumento);

            // Update the sold quantity of the instrument
            int nuevaCantidadVendida = Integer.parseInt(instrumento.getCantidadVendida()) + pedidoDetalle.getCantidad();
            instrumento.setCantidadVendida(String.valueOf(nuevaCantidadVendida));

            instrumentoServiceImpl.save(instrumento);
        }

        return pedidoDetalleImpl.saveAll(pedidoDetalles);
    }

    @PostMapping("/detallePedido")
    public PedidoDetalle save(@RequestBody PedidoDetalle pedidoDetalle){
        Pedido pedido = pedidoServicioImpl.getById(pedidoDetalle.getPedido().getId());
        pedidoDetalle.setPedido(pedido);

        Instrumento instrumento = instrumentoServiceImpl.getById(pedidoDetalle.getInstrumento().getId());
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
