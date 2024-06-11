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
        // Iterar sobre cada pedidoDetalle y realizar las operaciones necesarias antes de guardarlos
        for (PedidoDetalle pedidoDetalle : pedidoDetalles) {
            Pedido pedido = pedidoServicioImpl.getById(pedidoDetalle.getPedido().getId());
            pedidoDetalle.setPedido(pedido);

            Instrumento instrumento = instrumentoServiceImpl.getById(pedidoDetalle.getInstrumento().getId());
            pedidoDetalle.setInstrumento(instrumento);

            // Actualizar la cantidad vendida del instrumento
            int nuevaCantidadVendida = Integer.parseInt(instrumento.getCantidadVendida()) + pedidoDetalle.getCantidad();
            instrumento.setCantidadVendida(String.valueOf(nuevaCantidadVendida));

            instrumentoServiceImpl.save(instrumento);
        }

        // Guardar todos los pedidoDetalles y devolver la lista completa
        return pedidoDetalleImpl.saveAll(pedidoDetalles);
    }

    @PostMapping("/detallePedido")
    public PedidoDetalle save(@RequestBody PedidoDetalle pedidoDetalle){
        // Buscar el pedido por su ID y establecerla en el pedidoDetalle
        Pedido pedido = pedidoServicioImpl.getById(pedidoDetalle.getPedido().getId());
        pedidoDetalle.setPedido(pedido);

        // Buscar el instrumento por su ID y establecerla en el pedidoDetalle
        Instrumento instrumento = instrumentoServiceImpl.getById(pedidoDetalle.getInstrumento().getId());
        pedidoDetalle.setInstrumento(instrumento);

        // Guardar el pedidoDetalle
        PedidoDetalle savedPedidoDetalle = pedidoDetalleImpl.save(pedidoDetalle);

        // Devolver el pedidoDetalle guardado
        return savedPedidoDetalle;
    }

    @GetMapping("/detallePedido")
    public List<PedidoDetalle> getAll(){
        return pedidoDetalleImpl.getAll();
    }

    @GetMapping("/detallePedido/{id}")
    private PedidoDetalle getById(@PathVariable String id){ return pedidoDetalleImpl.getById(Long.parseLong(id));}

    @DeleteMapping("/detallePedido/{id}")
    public void remove(@PathVariable String id){
        pedidoDetalleImpl.remove(Long.parseLong(id));
    }

    @PutMapping("/detallePedido/{id}")
    public void update(@PathVariable Long id, @RequestBody PedidoDetalle pedidoDetalle){
        // Verificar si el instrumento con el ID dado existe en la base de datos
        PedidoDetalle existingPedidoDetalle = pedidoDetalleImpl.getById(id);
        if (existingPedidoDetalle != null) {
            // Asignar el ID al instrumento que se va a actualizar
            pedidoDetalle.setId(id);

            // Buscar la categoría por su ID y establecerla en el instrumento
            Pedido pedido = pedidoServicioImpl.getById(pedidoDetalle.getPedido().getId());
            pedidoDetalle.setPedido(pedido);

            // Buscar la categoría por su ID y establecerla en el instrumento
            Instrumento instrumento = instrumentoServiceImpl.getById(pedidoDetalle.getInstrumento().getId());
            pedidoDetalle.setInstrumento(instrumento);

            // Guardar el instrumento actualizado
            pedidoDetalleImpl.save(pedidoDetalle);
        } else {
            // Si no se encuentra el instrumento con el ID dado, lanzar una excepción o manejar el error según sea necesario
            throw new RuntimeException("El pedidoDetalle con ID " + id + " no existe.");
        }
    }
}
