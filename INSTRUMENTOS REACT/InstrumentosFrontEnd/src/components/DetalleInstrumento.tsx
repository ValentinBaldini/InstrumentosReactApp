import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Instrumento from "../entidades/Instrumento";
import InstrumentoService from "../services/InstrumentoService";
import icon from '../assets/arrow_back_24dp_FILL0_wght400_GRAD0_opsz24.svg';
import './css/detalleInstrumento.css'
import Navbar from "./navbar";

const DetalleInstrumento = () => {
    const { idInstrumento } = useParams<{ idInstrumento: string }>();
    const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const downloadPDF = async (idInstrumento: string) => {
        try {
            await InstrumentoService.downloadPDF(Number(idInstrumento));
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
            setError("Error al descargar el PDF");
        }
    };

    useEffect(() => {
        InstrumentoService.getInstrumentosByID(Number(idInstrumento))
            .then(response => {
                setInstrumento(response.data);
                console.log("Instrumentos cargados:", response.data);
            })
            .catch(error => {
                console.error("Error al cargar los instrumentos:", error);
                setError("Error al cargar los datos del instrumento");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idInstrumento]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!instrumento) {
        return <div>No se encontró el instrumento.</div>;
    }

    const classEnvioText = instrumento.costoEnvio === "G" ? "envio-gratis" : "envio-costo";
    const textEnvio = instrumento.costoEnvio === "G" ? (
        <>
          <img src="/img/camion.png" alt="Camión de envío" />
          ENVIO GRATIS A TODO EL PAIS
        </>
      ) : `Costo de envio: $${instrumento.costoEnvio}`;

    return (
        <>
        <Navbar></Navbar>
        <a href="/productos" className="aDetalle"><div className="btnDetalleVolver"><button className="btn btn-info"><img src={icon} alt="icon" style={{ marginRight: '8px' }}/><a className="aDetalle">Volver</a></button></div></a>
        <div className="detalle-instrumento-container">
            <div className="detalle-instrumento">
                <div className="imagen-container">
                    <img src={`/img/${instrumento.imagen}`} alt={instrumento.instrumento} />
                </div>
                <div className="informacion-containerDetalle">
                    <h1>{instrumento.instrumento}</h1>
                    <h2>{instrumento.marca} - {instrumento.modelo}</h2>
                    <h2>{instrumento.categoria?.denominacion}</h2>
                    <p className='descripcionDetalle'>{instrumento.descripcion}</p>
                    <p className={classEnvioText}>{textEnvio}</p>
                    <div className="precio-container">
                        <p className="precio">${instrumento.precio}</p>
                    </div>
                </div>
            </div>
        </div>
        <button className="btn btn-danger" onClick={()=>downloadPDF(idInstrumento)}>Descargar PDF</button>
        </>
    );
}

export default DetalleInstrumento;
