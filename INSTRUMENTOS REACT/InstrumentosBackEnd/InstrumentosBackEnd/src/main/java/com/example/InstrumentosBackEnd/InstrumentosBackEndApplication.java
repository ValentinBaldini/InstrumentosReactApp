package com.example.InstrumentosBackEnd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import com.example.InstrumentosBackEnd.controlador.AuthController;
import com.example.InstrumentosBackEnd.modelo.Categoria;
import com.example.InstrumentosBackEnd.modelo.Usuario;
import com.example.InstrumentosBackEnd.repositorio.CategoriaRepositorio;

@SpringBootApplication
public class InstrumentosBackEndApplication implements CommandLineRunner{

	@Autowired
	private CategoriaRepositorio categoriaRepositorio;

	public static void main(String[] args) {
		SpringApplication.run(InstrumentosBackEndApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Crear y guardar las categorías
		Categoria categoria1 = new Categoria();
		categoria1.setDenominacion("Cuerda");
		categoriaRepositorio.save(categoria1);

		Categoria categoria2 = new Categoria();
		categoria2.setDenominacion("Viento");
		categoriaRepositorio.save(categoria2);

		Categoria categoria3 = new Categoria();
		categoria3.setDenominacion("Percusion");
		categoriaRepositorio.save(categoria3);

		Categoria categoria4 = new Categoria();
		categoria4.setDenominacion("Teclado");
		categoriaRepositorio.save(categoria4);

		Categoria categoria5 = new Categoria();
		categoria5.setDenominacion("Electronico");
		categoriaRepositorio.save(categoria5);
	}

}
