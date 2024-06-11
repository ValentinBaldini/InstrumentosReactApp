import { ReactNode, createContext, useEffect, useState } from 'react'
import Instrumento from '../entidades/Instrumento';
import DetallePedido from '../entidades/DetallePedido';
import Pedido from '../entidades/Pedido';
import InstrumentoService from '../services/InstrumentoService';

interface CartContextType {
    cart: DetallePedido[];
    addCarrito: (product: Instrumento) => void;
    removeCarrito: (product: Instrumento) => void;
    removeItemCarrito: (product: Instrumento) => void;
    limpiarCarrito: () => void;
    totalPedido: number;
}

export const CartContext = createContext<CartContextType>({
    cart: [],
    addCarrito: () => {},
    removeCarrito: () => {},
    removeItemCarrito: () => {},
    limpiarCarrito: () => {},
    totalPedido: 0
});

export function CarritoContextProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<DetallePedido[]>([]);
    const [totalPedido, setTotalPedido] = useState<number>(0);

    useEffect(() => {
        calcularTotalCarrito();
    }, [cart]);

    const addCarrito = (product: Instrumento) => {
        let existe = false;
        cart.forEach(element => {
            if (element.instrumento.id === product.id) {
                existe = true;
                return existe;
            }
        });

        if (existe) {
            const cartClonado = cart.map(item =>
                item.instrumento.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
            );
            setCart(cartClonado);
        } else {
            const nuevoDetalle: DetallePedido = {
                instrumento: product,
                cantidad: 1,
                pedido: { fechaPedido: new Date(), totalPedido: Number(product.precio) }
            };
            setCart(prevCart => [...prevCart, nuevoDetalle]);
        }
    };

    const removeCarrito = (product: Instrumento) => {
        setCart(prevCart => prevCart.filter(item => item.instrumento.id !== product.id));
    };

    const removeItemCarrito = (product: Instrumento) => {
        const existente = cart.find(item => item.instrumento.id === product.id);

        if (existente) {
            if (existente.cantidad > 1) {
                const cartClonado = cart.map(item =>
                    item.instrumento.id === product.id ? { ...item, cantidad: item.cantidad - 1 } : item
                );
                setCart(cartClonado);
            } else {
                setCart(prevCart => prevCart.filter(item => item.instrumento.id !== product.id));
            }
        }
    };

    const limpiarCarrito = () => {
        setCart([]);
        setTotalPedido(0);
    };

    const calcularTotalCarrito = () => {
        const total = cart.reduce((acc, item) => acc + item.instrumento.precio * item.cantidad, 0);
        setTotalPedido(total);
    };

    const handleCheckout = async () => {
        try {
            // Crear un nuevo pedido
            const nuevoPedido: Pedido = {
                fechaPedido: new Date(),
                totalPedido: totalPedido
            };
    
            // Realizar una solicitud POST para guardar el pedido
            const pedidoGuardado = await InstrumentoService.savePedido(nuevoPedido);
    
            // Asignar el ID del pedido guardado a cada detalle de pedido en el carrito
            const detallesConPedido: DetallePedido[] = cart.map(detalle => ({
                ...detalle,
                cantidad : 0,
                pedido: {
                    id: pedidoGuardado.id,
                    fechaPedido: pedidoGuardado.fechaPedido,
                    totalPedido: pedidoGuardado.totalPedido
                }
            }));
            
    
            // Realizar una solicitud POST para guardar los detalles del pedido
            await InstrumentoService.saveDetallePedido(detallesConPedido);
    
            // Limpiar el carrito después de enviar los datos
            limpiarCarrito();
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, totalPedido }}>
            {children}
            {<button className="d-none" onClick={handleCheckout}>Enviar Datos</button>}
        </CartContext.Provider>
    );
}
