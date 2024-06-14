import { Link } from 'react-router-dom';
import './css/itemInstrumento.css'
import { useCarrito } from '../hooks/useCarrito';
import Instrumento from '../entidades/Instrumento';
import './css/carrito.css'
import Categoria from '../entidades/Categoria';

type instrumentoParams = {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: string;
    costoEnvio: string;
    cantidadVendida: string;
    descripcion: string;
    instrumentoObj: Instrumento;
    isProductInCart: boolean;
    categoria?: Categoria;
}

const ItemInstrumento = (args: instrumentoParams) => {
    const { addCarrito, cart, removeCarrito, removeItemCarrito } = useCarrito();

    const isInstrumentoInCarrito = cart.some(item => item.id === args.instrumentoObj.id);

    const handleAddToCart = () => {
        if (isInstrumentoInCarrito) {
            removeCarrito(args.instrumentoObj);
        } else {
            addCarrito(args.instrumentoObj);
        }
    };

    return (
        <div className='col-sm-5'>
            <div className="wrapper">
                <div className="product-img">
                    <img src={`/img/${args.imagen}`} height="420" width="327" alt="Instrumento" />
                </div>
                <div className="product-info">
                    <div className="product-text">
                        <h1>{args.instrumento}</h1>
                        <h2>{args.marca}</h2>
                        <h2>{args.categoria?.denominacion}</h2>
                        <p className='descripcion'>{args.descripcion}</p>
                        <p className={args.costoEnvio === "G" ? "envio-gratis" : "envio-costo"}>
                            {args.costoEnvio === "G" ?
                                <>
                                    <img src="/img/camion.png" alt="Camión de envío" />
                                    ENVIO GRATIS A TODO EL PAIS
                                </>
                                :
                                `Costo de envio: $${args.costoEnvio}`
                            }
                        </p>
                    </div>
                    <div className="product-price-btn">
                        <p>$<span>{args.precio}</span></p>
                        <div className='btn-group'>
                            <a className='iconoMenos' onClick={() => removeItemCarrito(args.instrumentoObj)}>-</a>
                            <button type="button" onClick={handleAddToCart}>
                                {isInstrumentoInCarrito ?
                                    <>
                                        Quitar del carrito
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                        </svg>
                                    </>
                                    :
                                    <>
                                        Agregar al carrito
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                        </svg>
                                    </>
                                }
                            </button>
                            <a className='iconoMas' onClick={() => addCarrito(args.instrumentoObj)}>+</a>
                        </div>
                    </div>
                    <Link to={`/instrumentos/${args.id}`} className='detallebtn'>Ver Detalle</Link>
                </div>
            </div>
        </div>
    )
}

export default ItemInstrumento
