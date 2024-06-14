import { useState } from 'react';
import Pedido from '../entidades/Pedido.ts';
import { useCarrito } from '../hooks/useCarrito.tsx'
import InstrumentoService from '../services/InstrumentoService.ts';
import CheckoutMP from './CheckoutMP.tsx';
import './css/carrito.css'
import DetallePedido from '../entidades/DetallePedido.ts';
import Usuario from '../entidades/Usuario.ts';
import { useNavigate } from 'react-router-dom';

function CartItem({ item }: { item: DetallePedido }) {
  const { instrumento } = item;
  const textEnvio = instrumento.costoEnvio === 'G' ? '' : "+ costo envio";

  return (
    <div key={item.id} className="item-container">
      <div className="item-content">
        <img className="item-image" src={`/img/${instrumento.imagen}`} alt={instrumento.instrumento} />
        <div className="item-details">
          <div className="item-name-price">
            <strong>{instrumento.instrumento}</strong> - ${instrumento.precio}
          </div>
          <div className="item-quantity">
            <b>{item.cantidad} {Number(item.cantidad) === 1 ? 'unidad' : 'unidades'} </b>
            <b>{textEnvio}</b>
          </div>
        </div>
      </div>
      <hr className="item-divider" />
    </div>
  )
}

export default function Carrito() {

  const { cart, limpiarCarrito, totalPedido } = useCarrito();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const navigate = useNavigate();

  //Traigo el usuario logueado
  const [jsonUsuario] = useState<any>(localStorage.getItem('usuario'));
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

  const navigateLogin = () => {
    navigate('/login', {
      replace: true,
      state: {
        logged: false
      },
    });
  }

  const handleCheckout = async () => {
    try {
      if (cart.length === 0) {
        alert("El carrito está vacío. Por favor, cargue los instrumentos al carrito.");
        return;
      }

      // Primero guarda el pedido
      const nuevoPedido: Pedido = {
        fechaPedido: new Date(),
        totalPedido: totalPedido
      };

      const pedidoGuardado = await InstrumentoService.savePedido(nuevoPedido);
      setPedido(pedidoGuardado);

      // Construye los detalles del pedido como DetallePedido[]
      const detallesConPedido: DetallePedido[] = cart.map(detalle => ({
        id: undefined, // Opcional, dependiendo de cómo se maneje en tu servicio
        cantidad: detalle.cantidad,
        instrumento: detalle.instrumento,
        pedido: {
          id: pedidoGuardado.id // Asigna el id del pedido guardado
        }
      }));

      // Guarda todos los detalles del pedido utilizando la función que espera un arreglo
      await InstrumentoService.saveAllDetallePedido(detallesConPedido);

      alert(`El pedido con id ${pedidoGuardado.id} se guardó correctamente`);
      //limpiarCarrito();
    } catch (error) {
      console.error("Error al procesar el checkout:", error);
    }
  };

  return (
    <>
      <aside className='cart'>
        <b>CARRITO</b>
        <ul>
          {cart.map((detalle: DetallePedido, index) =>
            <CartItem key={index} item={detalle} />
          )}
        </ul>
        <div>
          <h3>${totalPedido}</h3>
        </div>

        <button onClick={limpiarCarrito} title='Limpiar Todo' className='btn-limpiar'>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </button>
        <br></br>
        <br></br>
        {
          (usuarioLogueado)
            ? <button className="btn btn-success" onClick={() => handleCheckout()}>
              Realizar Compra
            </button>
            : <button className="btn btn-success" onClick={() => navigateLogin()}>
              Realizar Compra
            </button>

        }
        {pedido &&
          <CheckoutMP montoTotal={totalPedido}></CheckoutMP>
        }
      </aside>
    </>
  )
}