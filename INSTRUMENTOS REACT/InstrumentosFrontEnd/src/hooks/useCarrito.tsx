import { useContext } from "react"
import { CartContext } from "../context/CarritoContext"

export const useCarrito = () =>{
    const context = useContext(CartContext);

    if(context === undefined){
        throw new Error("useCarrito debe ser usado en el ambito de un CartProvider");
    }

    return context
}