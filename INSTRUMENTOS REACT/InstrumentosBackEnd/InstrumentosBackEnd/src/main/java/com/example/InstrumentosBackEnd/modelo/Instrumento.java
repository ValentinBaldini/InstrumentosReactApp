package com.example.InstrumentosBackEnd.modelo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="instrumentos")
@EqualsAndHashCode
public class Instrumento implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(name="instrumento")
    String instrumento;
    @Column(name="marca")
    String marca;
    @Column(name="modelo")
    String modelo;
    @Column(name="imagen")
    String imagen;
    @Column(name="precio")
    String precio;
    @Column(name="costoEnvio")
    String costoEnvio;
    @Column(name="cantidadVendida")
    String cantidadVendida;
    @Column(name="descripcion", length = 1500)
    String descripcion;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @OneToMany(mappedBy = "instrumento", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<PedidoDetalle> detallesPedido = new ArrayList<>();
    
}
