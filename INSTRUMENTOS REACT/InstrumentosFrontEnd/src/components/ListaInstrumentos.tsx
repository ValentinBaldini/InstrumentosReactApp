import { useEffect, useState } from "react"
import Instrumento from "../entidades/Instrumento"
import InstrumentoService from "../services/InstrumentoService";
import ItemInstrumento from "./ItemInstrumento";
import Navbar from "./navbar";
import { CarritoContextProvider } from "../context/CarritoContext";
import Carrito from "./Carrito";
import './css/carrito.css'

const CarritoCompra = () => {

    const [instrumentos, setInstrumentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        InstrumentoService.getAllInstrumentos().then(response => {
            setInstrumentos(response.data);
            console.log("Instrumentos cargados:", response.data);
        }).catch(error => {
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        })
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <CarritoContextProvider>
                <Navbar></Navbar>
                <div className="row">
                    <div className="col-10">
                        <div className="row">
                            {instrumentos.map((ins: Instrumento) =>
                                <ItemInstrumento  isProductInCart={false} instrumentoObj={ins} key={ins.id} id={ins.id} instrumento={ins.instrumento} precio={ins.precio} marca={ins.marca} modelo={ins.modelo} descripcion={ins.descripcion} costoEnvio={ins.costoEnvio} imagen={ins.imagen} cantidadVendida={ins.cantidadVendida}></ItemInstrumento>
                            )}
                        </div>
                    </div>
                    <div className="col">
                        <Carrito></Carrito>
                    </div>
                </div>
            </CarritoContextProvider>
        </>
    )
}

export default CarritoCompra
