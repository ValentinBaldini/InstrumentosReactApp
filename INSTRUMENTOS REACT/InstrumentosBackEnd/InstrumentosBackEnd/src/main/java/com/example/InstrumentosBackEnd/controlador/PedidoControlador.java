package com.example.InstrumentosBackEnd.controlador;

import com.example.InstrumentosBackEnd.modelo.Pedido;
import com.example.InstrumentosBackEnd.modelo.PedidoDetalle;
import com.example.InstrumentosBackEnd.repositorio.PedidoDetalleRepositorio;
import com.example.InstrumentosBackEnd.repositorio.PedidoRepositorio;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.example.InstrumentosBackEnd.servicio.ExcelService;
import com.example.InstrumentosBackEnd.servicio.PedidoServicio;
import com.example.InstrumentosBackEnd.servicio.PedidoServicioImpl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Date;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class PedidoControlador {

    @Autowired
    private PedidoServicioImpl pedidoServicioImpl;

    @Autowired PedidoServicio pedidoServicio;

    @Autowired
    PedidoDetalleRepositorio pedidoDetalleRepositorio;

    @Autowired ExcelService excelService;

    /*@Autowired
    private PedidoRepositorio pedidoRepositorio;
*/
    @PostMapping("/pedidos")
    public Pedido save(@RequestBody Pedido pedido) {
        // Guardar el pedido
        Pedido savedPedido = pedidoServicioImpl.save(pedido);
        System.out.println("Pedido guardado con ID: " + savedPedido.getId());
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

    @GetMapping("/cantidadPedido")
    public  List<List<Object>> getPedidosByFecha(){
        return pedidoServicio.getcantidadPedido();
    }

    @GetMapping("/pedidoPorMes")
    public  List<List<Object>> getPedidosPorMesYAnio(@RequestParam("anio") Integer anio){
        return pedidoServicio.getPedidosPorMesYAnio(anio);
    }

    @GetMapping("/descargarExcelPedidos")
    public ResponseEntity<byte[]> downloadExcelFechas(@RequestParam(name = "fechaDesde", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaDesde,
                                                      @RequestParam(name = "fechaHasta", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaHasta) throws IOException {
        List<PedidoDetalle> detallesPedidos;

        if (fechaDesde != null && fechaHasta != null) {
            // Si se proporcionan ambas fechas, filtra los detalles de pedido por el rango de fechas
            detallesPedidos = pedidoDetalleRepositorio.findByPedido_FechaPedidoBetween(fechaDesde, fechaHasta);
        } else {
            // Si no se proporcionan ambas fechas, obtiene todos los detalles de pedido
            detallesPedidos = pedidoDetalleRepositorio.findAll();
        }

        ByteArrayInputStream in = excelService.exportPedidosToExcel(detallesPedidos);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=Pedidos.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(in.readAllBytes());
    }

    
}
