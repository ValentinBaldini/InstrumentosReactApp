package com.example.InstrumentosBackEnd.servicio;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.InstrumentosBackEnd.modelo.*;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Service;

@Service
public class ExcelService {

    public ByteArrayInputStream exportPedidosToExcel(List<PedidoDetalle> detallesPedidos) throws IOException {
        String[] columns = {"Fecha Pedido", "Nombre Instrumento", "Marca", "Modelo", "Cantidad", "Precio", "Subtotal"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Pedidos");

            // Definir el ancho de las columnas y el estilo de las celdas
            int[] columnWidths = {21, 55, 12, 10, 10, 8, 10};
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true); // Aplicar negrita
            headerStyle.setFont(headerFont);
            headerStyle.setAlignment(HorizontalAlignment.CENTER); // Centrar el texto
            headerStyle.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex()); 
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND); // Patrón de relleno sólido
            headerStyle.setBorderTop(BorderStyle.THIN); // Agregar borde superior
            headerStyle.setBorderBottom(BorderStyle.THIN); // Agregar borde inferior
            headerStyle.setBorderLeft(BorderStyle.THIN); // Agregar borde izquierdo
            headerStyle.setBorderRight(BorderStyle.THIN); // Agregar borde derecho
            CellStyle centeredStyle = workbook.createCellStyle();
            centeredStyle.setAlignment(HorizontalAlignment.CENTER);
            centeredStyle.setBorderTop(BorderStyle.THIN); // Agregar borde superior
            centeredStyle.setBorderBottom(BorderStyle.THIN); // Agregar borde inferior
            centeredStyle.setBorderLeft(BorderStyle.THIN); // Agregar borde izquierdo
            centeredStyle.setBorderRight(BorderStyle.THIN); // Agregar borde derecho
            CellStyle lightYellowStyle = workbook.createCellStyle();
            lightYellowStyle.setFillForegroundColor(IndexedColors.WHITE.getIndex()); 
            lightYellowStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND); // Patrón de relleno sólido
            lightYellowStyle.setBorderTop(BorderStyle.THIN); // Agregar borde superior
            lightYellowStyle.setBorderBottom(BorderStyle.THIN); // Agregar borde inferior
            lightYellowStyle.setBorderLeft(BorderStyle.THIN); // Agregar borde izquierdo
            lightYellowStyle.setBorderRight(BorderStyle.THIN); // Agregar borde derecho

            // Setear el ancho de las columnas
            for (int i = 0; i < columns.length; i++) {
                sheet.setColumnWidth(i, columnWidths[i] * 256); // Multiplicar por 256 para convertir de caracteres a unidades de ancho de columna
            }

            // Crear el índice del encabezado de fila
            int headerRowIdx = 0;
            Row headerRow = sheet.createRow(headerRowIdx);
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i].toUpperCase());
                cell.setCellStyle(headerStyle); // Aplicar estilo de encabezado
            }

            // Agrupar los detalles de pedido por pedido
            Map<Pedido, List<PedidoDetalle>> detallesPorPedido = new HashMap<>();
            for (PedidoDetalle detalle : detallesPedidos) {
                Pedido pedido = detalle.getPedido();
                detallesPorPedido.computeIfAbsent(pedido, k -> new ArrayList<>()).add(detalle);
            }

            // Crear filas para cada grupo de pedido
            int rowIdx = 1;
            for (Map.Entry<Pedido, List<PedidoDetalle>> entry : detallesPorPedido.entrySet()) {
                Pedido pedido = entry.getKey();
                List<PedidoDetalle> detalles = entry.getValue();

                // Agregar detalles de pedido
                for (PedidoDetalle detalle : detalles) {
                    Row row = sheet.createRow(rowIdx++);

                    Instrumento instrumento = detalle.getInstrumento();
                    row.createCell(0).setCellValue(pedido.getFechaPedido().toString());
                    row.createCell(1).setCellValue(instrumento.getInstrumento());
                    row.createCell(2).setCellValue(instrumento.getMarca());
                    row.createCell(3).setCellValue(instrumento.getModelo());
                    row.createCell(4).setCellValue(detalle.getCantidad());
                    row.createCell(5).setCellValue(instrumento.getPrecio());
                    row.createCell(6).setCellValue(detalle.getCantidad() * Integer.parseInt(instrumento.getPrecio()));
                }


            }
            // Aplicar estilo de fondo amarillo claro al resto de la tabla
            for (int i = headerRowIdx + 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                for (int j = 0; j < columns.length; j++) {
                    Cell cell = row.getCell(j);
                    if (cell != null) {
                        cell.setCellStyle(lightYellowStyle);
                    }
                }
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}