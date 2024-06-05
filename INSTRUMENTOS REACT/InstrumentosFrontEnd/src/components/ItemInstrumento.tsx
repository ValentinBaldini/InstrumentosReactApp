import { Link } from 'react-router-dom';
import './css/itemInstrumento.css'

type instrumentoParams={
    id: string;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: string;
    costoEnvio: string;
    cantidadVendida: string;
    descripcion: string;
}

const ItemInstrumento = (args : instrumentoParams) => {
    const  classEnvioText = args.costoEnvio === "G" ? "envio-gratis" : "envio-costo";
    const textEnvio = args.costoEnvio === "G" ? "ENVIO GRATIS A TODO EL PAIS" : `Costo de envio: $${args.costoEnvio}`;
    return (
        <>
            <div className='col-sm-6'>
                <div className="wrapper">
                    <div className="product-img">
                        <img src={`/public/img/${args.imagen}`} height="420" width="327" />
                    </div>
                    <div className="product-info">
                        <div className="product-text">
                            <h1>{args.instrumento}</h1>
                            <h2>{args.marca}</h2>
                            <p className='descripcion'>{args.descripcion}</p>
                            <p className={classEnvioText}>{textEnvio}</p>
                        </div>
                        <div className="product-price-btn">
                            <p>$<span>{args.precio}</span></p>
                            <button type="button">Comprar</button>
                            <Link className="btn btn-info" to={`/detalleInstrumento/${args.id}`}>Ver Detalle</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemInstrumento
