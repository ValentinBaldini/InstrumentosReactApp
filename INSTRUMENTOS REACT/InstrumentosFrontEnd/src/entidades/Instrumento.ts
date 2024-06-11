import { ChangeEventHandler } from "react";

export default class Instrumento {
    id: string="";
    instrumento: string = "";
    marca: string = "";
    modelo: string = "";
    imagen: string = "";
    precio: string = "";
    costoEnvio: string = "";
    cantidadVendida: string = "";
    descripcion: string = "";
    addCarrito?:ChangeEventHandler;
}