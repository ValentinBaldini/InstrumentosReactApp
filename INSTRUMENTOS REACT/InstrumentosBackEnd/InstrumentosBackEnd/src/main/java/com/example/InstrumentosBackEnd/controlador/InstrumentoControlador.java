package com.example.InstrumentosBackEnd.controlador;

import com.example.InstrumentosBackEnd.excepcion.ResourceNotFoundException;
import com.example.InstrumentosBackEnd.modelo.Categoria;
import com.example.InstrumentosBackEnd.modelo.Instrumento;
import com.example.InstrumentosBackEnd.repositorio.InstrumentoRepositorio;
import com.example.InstrumentosBackEnd.servicio.CategoriaServicioImpl;
import com.example.InstrumentosBackEnd.servicio.InstrumentoServiceImpl;
import com.example.InstrumentosBackEnd.servicio.InstrumentoServicio;
import com.example.InstrumentosBackEnd.servicio.PDFService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class InstrumentoControlador {

    @Autowired
    private InstrumentoServiceImpl instrumentoServiceImpl;

    @Autowired
    private CategoriaServicioImpl categoriaServicioImpl;
    
    @Autowired
    InstrumentoRepositorio instrumentoRepositorio;

    @Autowired
    PDFService pdfService;

    @GetMapping("/instrumentos")
    private List<Instrumento> listarInstrumentos(){
        return instrumentoServiceImpl.getAll();
    }

    @PostMapping("/instrumentos")
    public void guardarInstrumento(@RequestBody Instrumento instrumento){
        // Buscar la categoría por su ID y establecerla en el instrumento
        Categoria categoria = categoriaServicioImpl.getById(instrumento.getCategoria().getId());
        instrumento.setCategoria(categoria);

        // Guardar el instrumento
        instrumentoServiceImpl.save(instrumento);
    }

    @GetMapping("/instrumentos/{id}")
    public ResponseEntity<Instrumento> listarInstrumentoXId(@PathVariable Long id){
        Instrumento instrumento = instrumentoServiceImpl.getById(id);
        return ResponseEntity.ok(instrumento);
    }

    @PutMapping("/instrumentos/{id}")
    public void actualizarInstrumento(@PathVariable Long id, @RequestBody Instrumento instrumentoRequest){
        // Verificar si el instrumento con el ID dado existe en la base de datos
        Instrumento existingInstrumento = instrumentoServiceImpl.getById(id);
        if (existingInstrumento != null) {
            // Asignar el ID al instrumento que se va a actualizar
            instrumentoRequest.setId(id);

            // Verificar si la categoría es válida
            if (instrumentoRequest.getCategoria() != null && instrumentoRequest.getCategoria().getId() != null) {
                // Buscar la categoría por su ID y establecerla en el instrumento
                Categoria categoria = categoriaServicioImpl.getById(instrumentoRequest.getCategoria().getId());
                if (categoria != null) {
                    instrumentoRequest.setCategoria(categoria);

                    // Guardar el instrumento actualizado
                    instrumentoServiceImpl.save(instrumentoRequest);
                } else {
                    throw new RuntimeException("La categoría con ID " + instrumentoRequest.getCategoria().getId() + " no existe.");
                }
            } else {
                throw new RuntimeException("El instrumento debe tener una categoría válida.");
            }
        } else {
            throw new RuntimeException("El instrumento con ID " + id + " no existe.");
        }
    }

    @DeleteMapping("/instrumentos/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarInstrumento(@PathVariable Long id){
        Instrumento instrumento = instrumentoServiceImpl.getById(id);
        instrumentoServiceImpl.remove(instrumento.getId());
        Map<String,Boolean>response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

     @GetMapping("/downloadPDFInstrumento/{id}")
    public ResponseEntity<byte[]> downloadPDFInstrumento(@PathVariable Long id) throws IOException {
        Instrumento instrumento = instrumentoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Instrumento no encontrado"));

        ByteArrayInputStream in = pdfService.generateInstrumentoPDF(instrumento);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=instrumento_" + id + ".pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(in.readAllBytes());
    }
}
