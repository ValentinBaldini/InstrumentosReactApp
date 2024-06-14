package com.example.InstrumentosBackEnd.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.InstrumentosBackEnd.servicio.ChartService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(path = "/api/chart")
public class ChartController {

}
