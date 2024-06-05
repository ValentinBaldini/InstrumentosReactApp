import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Instrumento from "../entidades/Instrumento";
import InstrumentoService from "../services/InstrumentoService";

const DetalleInstrumento = () => {
    const {idInstrumento} = useParams();
    const [instrumentos, setInstrumentos] = useState<Instrumento>();

    useEffect(() => {
        InstrumentoService.getInstrumentosByID(Number(idInstrumento)).then(response => {
            setInstrumentos(response.data);
            console.log("Instrumentos cargados:", response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [idInstrumento]);
     
    const  classEnvioText = instrumentos?.costoEnvio === "G" ? "envio-gratis" : "envio-costo";
    const textEnvio = instrumentos?.costoEnvio === "G" ? "ENVIO GRATIS A TODO EL PAIS" : `Costo de envio: $${instrumentos?.costoEnvio}`;

    return (
        <>
            <div className='col-sm-6'>
                <div className="wrapper">
                    <div className="product-img">
                        <img src={`/public/img/${instrumentos?.imagen}`} height="420" width="327" />
                    </div>
                    <div className="product-info">
                        <div className="product-text">
                            <h1>{instrumentos?.instrumento}</h1>
                            <h2>{instrumentos?.marca}</h2>
                            <h2>{instrumentos?.modelo}</h2>
                            <p className='descripcion'>{instrumentos?.descripcion}</p>
                            <p className={classEnvioText}>{textEnvio}</p>
                            <button>Ver Detalle</button>
                        </div>
                        <div className="product-price-btn">
                            <p>$<span>{instrumentos?.precio}</span></p>
                            <button type="button">Agregar al Carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetalleInstrumento
