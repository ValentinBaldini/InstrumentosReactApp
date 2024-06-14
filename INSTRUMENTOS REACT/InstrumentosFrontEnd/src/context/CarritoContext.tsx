import { ReactNode, createContext, useEffect, useState } from 'react';
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
        const existe = cart.some(item => item.instrumento.id === product.id);

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
        const total = cart.reduce((acc, item) => {
            const precioItem = Number(item.instrumento.precio) * item.cantidad;
            const costoEnvio = item.instrumento.costoEnvio === "G" ? 0 : Number(item.instrumento.costoEnvio) * item.cantidad;
            return acc + precioItem + costoEnvio;
        }, 0);
        setTotalPedido(total);
    };

    const handleCheckout = async () => {
        try {
            const nuevoPedido: Pedido = {
                fechaPedido: new Date(),
                totalPedido: totalPedido
            };

            const pedidoGuardado = await InstrumentoService.savePedido(nuevoPedido);

            const detallesConPedido: DetallePedido[] = cart.map(detalle => ({
                ...detalle,
                pedido: {
                    id: pedidoGuardado.id,
                    fechaPedido: pedidoGuardado.fechaPedido,
                    totalPedido: pedidoGuardado.totalPedido
                }
            }));

            await Promise.all(detallesConPedido.map(detalle => InstrumentoService.saveDetallePedido(detalle)));

            limpiarCarrito();
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito, totalPedido }}>
            {children}
            <button className="d-none" onClick={handleCheckout}>Enviar Datos</button>
        </CartContext.Provider>
    );
}
