import Instrumento from "./Instrumento";
import Pedido from "./Pedido";

export default class DetallePedido{
    id?: number = 0;
    cantidad: number = 0;
    instrumento: Instrumento = new Instrumento();
    pedido: Pedido = new Pedido();
}