import { ChangeEventHandler } from "react";
import Categoria from "./Categoria";

export default class Instrumento {
    id: number = 0;
    instrumento: string = "";
    marca: string = "";
    modelo: string = "";
    imagen: string = "";
    precio: string = "";
    costoEnvio: string = "";
    cantidadVendida: string = "";
    descripcion: string = "";
    addCarrito?:ChangeEventHandler;
    categoria?:Categoria;
}