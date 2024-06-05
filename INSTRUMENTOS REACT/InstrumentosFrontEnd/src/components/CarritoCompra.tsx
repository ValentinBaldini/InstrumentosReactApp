import { useEffect, useState } from "react"
import Instrumento from "../entidades/Instrumento"
import InstrumentoService from "../services/InstrumentoService";
import ItemInstrumento from "./ItemInstrumento";
import Navbar from "./navbar";

const CarritoCompra = () => {

    const [instrumentos, setInstrumentos] = useState([]);

    useEffect(() => {
        InstrumentoService.getAllInstrumentos().then(response => {
            setInstrumentos(response.data);
            console.log("Instrumentos cargados:", response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div>
                <div className="row">
                    {instrumentos.map((ins: Instrumento) =>
                        <ItemInstrumento key={ins.id} id={ins.id} instrumento={ins.instrumento} precio={ins.precio} marca={ins.marca} modelo={ins.modelo} descripcion={ins.descripcion} costoEnvio={ins.costoEnvio} imagen={ins.imagen} cantidadVendida={ins.cantidadVendida}></ItemInstrumento>
                    )}
                </div>
            </div>
        </>
    )
}

export default CarritoCompra
