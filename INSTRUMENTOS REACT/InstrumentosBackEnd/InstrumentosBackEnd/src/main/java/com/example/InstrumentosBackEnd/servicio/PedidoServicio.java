package com.example.InstrumentosBackEnd.servicio;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.apache.poi.sl.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.WorkbookUtil;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.InstrumentosBackEnd.modelo.Pedido;
import com.example.InstrumentosBackEnd.modelo.PedidoDetalle;
import com.example.InstrumentosBackEnd.modelo.DTO.PedidoInstrumentoDTO;
import com.example.InstrumentosBackEnd.modelo.DTO.PedidosPorMesAnioDTO;
import com.example.InstrumentosBackEnd.repositorio.PedidoRepositorio;

@Service
public class PedidoServicio implements PedidoServicioImpl {
    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    @Override
    public List<Pedido> getAll() {
        return (List<Pedido>) pedidoRepositorio.findAll();
    }

    @Override
    public Pedido getById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID must not be null");
        }

        Optional<Pedido> pedidoOptional = pedidoRepositorio.findById(id);

        if (pedidoOptional.isEmpty()) {
            throw new NoSuchElementException("Pedido not found with ID: " + id);
        }

        return pedidoOptional.get();
    }

    @Override
    public void remove(Long id) {
        pedidoRepositorio.deleteById(id);
    }

    @Override
    public Pedido save(Pedido pedido) {
        pedidoRepositorio.save(pedido);
        return pedido;
    }

    public List<List<Object>> getcantidadPedido() {
        List<List<Object>> data = new ArrayList<>();
        data.add(Arrays.asList("Articulo", "Cantidad"));
        List<PedidoInstrumentoDTO> pedidos = pedidoRepositorio.findCantidadPedidosAgrupadosPorInstrumento();

        for (PedidoInstrumentoDTO pedidoInstrumentoDTO : pedidos) {
            data.add(Arrays.asList(pedidoInstrumentoDTO.getInstrumentoNombre(),
                    pedidoInstrumentoDTO.getCantidadPedidos()));
        }
        return data;
    }

    public List<List<Object>> getPedidosPorMesYAnio(Integer anio) {
        List<List<Object>> data = new ArrayList<>();
        String[] nombresMeses = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
                "Septiembre", "Octubre", "Noviembre", "Diciembre" };
        data.add(Arrays.asList("Mes", "Pedidos"));
        List<PedidosPorMesAnioDTO> pedidos = pedidoRepositorio.countPedidosByYearAndMonth(anio);
        for (PedidosPorMesAnioDTO pedidosPorMesAnioDTO : pedidos) {
            String mes = nombresMeses[pedidosPorMesAnioDTO.getMonth() - 1];
            data.add(Arrays.asList(mes, pedidosPorMesAnioDTO.getCount()));
        }
        return data;
    }

    @Override
    public Workbook imprimirExcelPedidos(LocalDateTime fechaInicio, LocalDateTime fechaFin) {

        List<Pedido> pedidos = pedidoRepositorio.findPedidosEntreFechas(fechaInicio, fechaFin);

        Workbook wb = new XSSFWorkbook();

        String safeName = WorkbookUtil.createSafeSheetName("Libro 1"); // returns " O'Brien's sales "
        Sheet hoja = (Sheet) wb.createSheet(safeName);

        Row fila = ((org.apache.poi.ss.usermodel.Sheet) hoja).createRow(0);

        Cell celda = fila.createCell(0);
        celda.setCellValue("Fecha Pedido");
        celda = fila.createCell(1);
        celda.setCellValue("Instrumento");
        celda = fila.createCell(2);
        celda.setCellValue("Marca");
        celda = fila.createCell(3);
        celda.setCellValue("Modelo");
        celda = fila.createCell(4);
        celda.setCellValue("Cantidad");
        celda = fila.createCell(5);
        celda.setCellValue("Precio");
        celda = fila.createCell(6);
        celda.setCellValue("Subtotal");

        // Formateamos la fecha para que excel la reciba como un String
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        int nroFila = 1;

        for (Pedido pedido : pedidos) {
            for (PedidoDetalle pedidoDetalle : pedido.getDetallesPedido()) {
                int nroColumna = 0;
                fila = ((org.apache.poi.ss.usermodel.Sheet) hoja).createRow(nroFila);
                ++nroFila;
                celda = fila.createCell(nroColumna);
                celda.setCellValue(dateFormat.format(pedido.getFechaPedido()));
                celda = fila.createCell(++nroColumna);
                celda.setCellValue(pedidoDetalle.getInstrumento().getInstrumento());
                celda = fila.createCell(++nroColumna);
                celda.setCellValue(pedidoDetalle.getInstrumento().getMarca());
                celda = fila.createCell(++nroColumna);
                celda.setCellValue(pedidoDetalle.getInstrumento().getModelo());
                celda = fila.createCell(++nroColumna);
                celda.setCellValue(pedidoDetalle.getCantidad());
                celda = fila.createCell(++nroColumna);
                celda.setCellValue("$" + pedidoDetalle.getInstrumento().getPrecio());
                celda = fila.createCell(++nroColumna);
                celda.setCellValue(
                        "$" + Float.valueOf(pedidoDetalle.getInstrumento().getPrecio()) * pedidoDetalle.getCantidad());
            }

        }
        return wb;
    }
}
