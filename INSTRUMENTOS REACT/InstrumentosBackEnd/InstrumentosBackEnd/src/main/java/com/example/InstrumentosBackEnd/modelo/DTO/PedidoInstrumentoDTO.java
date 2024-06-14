package com.example.InstrumentosBackEnd.modelo.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PedidoInstrumentoDTO {
    private Long instrumentoId;
    private String instrumentoNombre;
    private Long cantidadPedidos;

    public PedidoInstrumentoDTO(Long instrumentoId, String instrumentoNombre, Long cantidadPedidos) {
        this.instrumentoId = instrumentoId;
        this.instrumentoNombre = instrumentoNombre;
        this.cantidadPedidos = cantidadPedidos;
    }
}
