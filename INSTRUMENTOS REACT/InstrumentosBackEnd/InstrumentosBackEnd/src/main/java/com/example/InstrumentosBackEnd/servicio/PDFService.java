package com.example.InstrumentosBackEnd.servicio;

import com.example.InstrumentosBackEnd.modelo.Instrumento;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.layout.borders.*;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;

@Service
public class PDFService {

    @SuppressWarnings("resource")
    public ByteArrayInputStream generateInstrumentoPDF(Instrumento instrumento) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(out);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc, PageSize.A4);
        document.setMargins(20, 20, 20, 20);

        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.COURIER_BOLD);
        PdfFont regularFont = PdfFontFactory.createFont(StandardFonts.COURIER);

        // Imagen
        ImageData imageData;
        if (instrumento.getImagen().startsWith("http")) {
            try {
                URL imageUrl = new URL(instrumento.getImagen());
                imageData = ImageDataFactory.create(imageUrl);
            } catch (MalformedURLException e) {
                throw new IOException("Invalid URL for image", e);
            }
        } else {
            ClassPathResource imgFile = new ClassPathResource("static/" + instrumento.getImagen());
            try (InputStream is = imgFile.getInputStream()) {
                imageData = ImageDataFactory.create(is.readAllBytes());
            }
        }

        Image image = new Image(imageData)
                .setWidth(UnitValue.createPercentValue(40))
                .setHorizontalAlignment(HorizontalAlignment.CENTER) // Centrar la imagen horizontalmente
                .setMarginBottom(10);

        Div detallesDiv = new Div()
                .setWidth(UnitValue.createPercentValue(60))
                .setHorizontalAlignment(HorizontalAlignment.CENTER) // Centrar los detalles horizontalmente
                .setMarginTop(20) // Espacio entre la imagen y los detalles
                .setBorder(null)
                .setBorder(new SolidBorder(1));

        detallesDiv.add(new Paragraph(String.valueOf("Total de ventas : " + instrumento.getCantidadVendida()))
                .setFontSize(12)
                .setTextAlignment(TextAlignment.CENTER)
                .setFont(boldFont));

        detallesDiv.add(new Paragraph(instrumento.getInstrumento())
                .setBold()
                .setFontSize(30)
                .setFont(boldFont)
                .setTextAlignment(TextAlignment.CENTER)); // Centrar el título

        detallesDiv.add(new Paragraph(instrumento.getDescripcion())
                .setFontSize(14)
                .setTextAlignment(TextAlignment.CENTER)
                .setFont(regularFont));

        Paragraph precioParagraph = new Paragraph()
                .add(new Text("Precio: ").setFont(boldFont))
                .add(new Text("$" + instrumento.getPrecio()).setFont(regularFont))
                .setMarginTop(10)
                .setTextAlignment(TextAlignment.CENTER); // Centrar el precio
        detallesDiv.add(precioParagraph);

        Paragraph marcaParagraph = new Paragraph()
                .add(new Text("Marca: ").setFont(boldFont))
                .add(new Text(instrumento.getMarca()).setFont(regularFont))
                .setMarginTop(5)
                .setTextAlignment(TextAlignment.CENTER); // Centrar la marca
        detallesDiv.add(marcaParagraph);

        Paragraph modeloParagraph = new Paragraph()
                .add(new Text("Modelo: ").setFont(boldFont))
                .add(new Text(instrumento.getModelo()).setFont(regularFont))
                .setMarginTop(5)
                .setTextAlignment(TextAlignment.CENTER); // Centrar el modelo
        detallesDiv.add(modeloParagraph);

        Paragraph envioParagraph = new Paragraph().setMarginTop(10);
        if ("G".equals(instrumento.getCostoEnvio()) || "0".equals(instrumento.getCostoEnvio())) {
            ClassPathResource truckImgFile = new ClassPathResource("static/camion.png");
            try (InputStream is = truckImgFile.getInputStream()) {
                Image truckImage = new Image(ImageDataFactory.create(is.readAllBytes()))
                        .setWidth(20)
                        .setMarginRight(5);
                envioParagraph.add(truckImage);
            }
            envioParagraph
                    .add(new Text("Envío gratis a todo el país").setFont(boldFont).setFontColor(ColorConstants.GREEN))
                    .setTextAlignment(TextAlignment.CENTER); // Centrar el texto del envío gratis
        } else {
            envioParagraph.add(new Text("Costo de Envío interior Argentina: $").setFont(boldFont)
                    .setFontColor(ColorConstants.ORANGE))
                    .setTextAlignment(TextAlignment.CENTER); // Centrar el texto del costo de envío
            envioParagraph.add(new Text(instrumento.getCostoEnvio()).setFontColor(ColorConstants.ORANGE))
                    .setTextAlignment(TextAlignment.CENTER); // Centrar el costo de envío
        }
        detallesDiv.add(envioParagraph);

        // Agregar la imagen arriba y los detalles abajo en una tabla
        Table table = new Table(new float[] { 1 });
        table.setWidth(UnitValue.createPercentValue(100));
        table.setBorder(Border.NO_BORDER);

        Cell imageCell = new Cell().add(image).setBorder(Border.NO_BORDER);
        Cell detailsCell = new Cell().add(detallesDiv).setBorder(Border.NO_BORDER);

        table.addCell(imageCell);
        table.addCell(detailsCell);

        document.add(table);

        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}
