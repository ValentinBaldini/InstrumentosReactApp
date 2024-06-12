package com.example.InstrumentosBackEnd.controlador;

import com.example.InstrumentosBackEnd.modelo.Pedido;
import com.example.InstrumentosBackEnd.repositorio.PedidoRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.InstrumentosBackEnd.servicio.PedidoServicioImpl;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class PedidoControlador {

    @Autowired
    private PedidoServicioImpl pedidoServicioImpl;

    /*@Autowired
    private PedidoRepositorio pedidoRepositorio;
*/
    @PostMapping("/pedidos")
    public Pedido save(@RequestBody Pedido pedido) {
        // Guardar el pedido
        Pedido savedPedido = pedidoServicioImpl.save(pedido);
        return savedPedido;
    }

    @GetMapping("/pedidos")
    public List<Pedido> getAll() {
        return pedidoServicioImpl.getAll();
    }

    @GetMapping("/pedidos/{id}")
    private Pedido getById(@PathVariable String id) {
        return pedidoServicioImpl.getById(Long.parseLong(id));
    }

    @DeleteMapping("/pedidos/{id}")
    public void remove(@PathVariable String id) {
        pedidoServicioImpl.remove(Long.parseLong(id));
    }

    @PutMapping("/pedidos/{id}")
    public void update(@PathVariable Long id, @RequestBody Pedido pedido) {
        Pedido existingPedido = pedidoServicioImpl.getById(id);
        if (existingPedido != null) { 
            pedido.setId(id); 
            pedidoServicioImpl.save(pedido);
        } else {
            throw new RuntimeException("El pedido con ID " + id + " no existe.");
        }
    }
}
