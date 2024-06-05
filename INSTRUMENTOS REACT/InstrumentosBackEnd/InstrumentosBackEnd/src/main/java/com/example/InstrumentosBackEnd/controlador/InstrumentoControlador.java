package com.example.InstrumentosBackEnd.controlador;

import com.example.InstrumentosBackEnd.excepcion.ResourceNotFoundException;
import com.example.InstrumentosBackEnd.modelo.Instrumento;
import com.example.InstrumentosBackEnd.repositorio.InstrumentoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class InstrumentoControlador {

    @Autowired
    private InstrumentoRepositorio instrumentoRepositorio;

    @GetMapping("/instrumentos")
    private List<Instrumento> listarInstrumentos(){
        return instrumentoRepositorio.findAll();
    }

    @PostMapping("/instrumentos")
    public Instrumento guardarInstrumento(@RequestBody Instrumento instrumento){
        return instrumentoRepositorio.save(instrumento);
    }

    @GetMapping("/instrumentos/{id}")
    public ResponseEntity<Instrumento> listarInstrumentoXId(@PathVariable Long id){
        Instrumento instrumento = instrumentoRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("El instrumento con ese ID no existe:"+id));
        return ResponseEntity.ok(instrumento);
    }

    @PutMapping("/instrumentos/{id}")
    public ResponseEntity<Instrumento> actualizarInstrumento(@PathVariable Long id, @RequestBody Instrumento instrumentoRequest){
        Instrumento instrumento = instrumentoRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("El instrumento con ese ID no existe:"+id));
        instrumento.setInstrumento(instrumentoRequest.getInstrumento());
        instrumento.setMarca(instrumentoRequest.getMarca());
        instrumento.setModelo(instrumentoRequest.getModelo());
        instrumento.setCantidadVendida(instrumentoRequest.getCantidadVendida());
        instrumento.setCostoEnvio(instrumentoRequest.getCostoEnvio());
        instrumento.setDescripcion(instrumentoRequest.getDescripcion());
        instrumento.setPrecio(instrumentoRequest.getPrecio());
        instrumento.setImagen(instrumentoRequest.getImagen());

        Instrumento instrumentoActualizado = instrumentoRepositorio.save(instrumento);
        return ResponseEntity.ok(instrumentoActualizado);
    }

    @DeleteMapping("/instrumentos/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarInstrumento(@PathVariable Long id){
        Instrumento instrumento = instrumentoRepositorio.findById(id).orElseThrow(()->new ResourceNotFoundException("El instrumento con ese ID no existe:"+id));
        instrumentoRepositorio.delete(instrumento);
        Map<String,Boolean>response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
