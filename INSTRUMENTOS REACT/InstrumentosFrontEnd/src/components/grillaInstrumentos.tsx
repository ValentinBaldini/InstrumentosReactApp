import Navbar from "./navbar"
import './css/grilla.css'
import { useEffect, useState } from "react"
import InstrumentoService from "../services/InstrumentoService"
import Instrumento from "../entidades/Instrumento"


const GrillaInstrumentos = () => {
    const [instrumentos, setInstrumentos] = useState([]);   
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{
        setRefresh(!refresh);
    },[])

    useEffect(() => {
        InstrumentoService.getAllInstrumentos().then(response => {
            setInstrumentos(response.data);
            console.log("Instrumentos cargados:", response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [refresh]);

    const deleteInstrumento = async (id: number) => {
        InstrumentoService.deleteInstrumento(id).then(response => {
            console.log("Instrumento eliminado: ", response.data);
            setRefresh(!refresh);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <Navbar></Navbar>
            <div className='containerGrilla'>
                <h1 className="h1Grilla">INSTRUMENTOS</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Envio</th>
                            <th scope="col">Cantidad Vendida</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            instrumentos.map((instrumento: Instrumento, index) =>
                                <tr key={index}>
                                    <td>{instrumento.id}</td>
                                    <td>{instrumento.instrumento}</td>
                                    <td>{instrumento.marca}</td>
                                    <td>{instrumento.modelo}</td>
                                    <td>${instrumento.precio}</td>
                                    <td>{instrumento.costoEnvio}</td>
                                    <td>{instrumento.cantidadVendida}</td>
                                    <td>
                                        <a href={`/formulario/` + instrumento.id}><button className="btn btn-warning" style={{ marginBottom: '10px' }}>Modificar</button></a>
                                        <button className="btn btn-danger" style={{ marginBottom: '10px' }} onClick={() => deleteInstrumento(Number(instrumento.id))}>Eliminar</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <a href={`/formulario/` + 0}><button className="btn btn-success" style={{ marginBottom: '10px' }}>Nuevo</button></a>
            </div>
        </>
    )
}

export default GrillaInstrumentos
