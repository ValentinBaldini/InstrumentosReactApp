import { useNavigate, useParams } from "react-router-dom"
import Navbar from "./navbar"
import { useEffect, useState } from "react";
import Instrumento from "../entidades/Instrumento";
import InstrumentoService from "../services/InstrumentoService";

const Formulario = () => {

    const { idInstrumento } = useParams();
    const [instrumentos, setInstrumentos] = useState<Instrumento>(new Instrumento());
    const navigate = useNavigate();

    useEffect(() => {
        getInstrumentos();
    }, [])

    const getInstrumentos = async () => {
        if (Number(idInstrumento) !== 0) {
            InstrumentoService.getInstrumentosByID(Number(idInstrumento)).then(response => {
                setInstrumentos(response.data);
                console.log("Instrumentos cargados:", response.data);
            }).catch(error => {
                console.log(error);
            })
        } else {
            const insSelect: Instrumento = new Instrumento();
            setInstrumentos(insSelect);
        }
    }

    const saveInstrumento = async () =>{
        if(instrumentos.instrumento === "" || instrumentos.instrumento == undefined){
            alert("Debe ingresar el nombre del instrumento");
            return;
        }
        if(instrumentos.marca === ""){
            alert("Debe ingresar la marca del instrumento");
            return;
        }
        if(instrumentos.modelo === ""){
            alert("Debe ingresar el modelo del instrumento");
            return;
        }
        if(instrumentos.precio === ""){
            alert("Debe ingresar el precio del instrumento");
            return;
        }
        if(instrumentos.costoEnvio === ""){
            alert("Debe ingresar el costo de envio del instrumento");
            return;
        }
        if(instrumentos.cantidadVendida === ""){
            alert("Debe ingresar la cantidad vendida del instrumento");
            return;
        }
        if(instrumentos.descripcion === ""){
            alert("Debe ingresar la descripcion del instrumento");
            return;
        }

        InstrumentoService.saveInstrumento(instrumentos).then(response => {
            console.log("Instrumentos actualizados:", response.data);
        }).catch(error => {
            console.log(error);
        })

        navigate("/grilla");
    }

    return (
        <>
            <Navbar></Navbar>
            <div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombreInst"
                            aria-describedby="emailHelp"
                            defaultValue={instrumentos?.instrumento}
                            onChange={e => instrumentos.instrumento = (e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Marca</label>
                        <input
                            type="text"
                            className="form-control"
                            id="marcaInst"
                            defaultValue={instrumentos?.marca}
                            onChange={e => instrumentos.marca = (e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Modelo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="modeloInst"
                            defaultValue={instrumentos?.modelo}
                            onChange={e => instrumentos.modelo = (e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Precio</label>
                        <input
                            type="text"
                            className="form-control"
                            id="precioInst"
                            defaultValue={instrumentos?.precio}
                            onChange={e => instrumentos.precio = (e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Costo Envio ('G'=Gratis)</label>
                        <input type="text"
                            className="form-control"
                            id="costoInst"
                            defaultValue={instrumentos?.costoEnvio}
                            onChange={e => instrumentos.costoEnvio = (e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Cantidad Vendida</label>
                        <input type="text"
                            className="form-control"
                            id="cantidadInst"
                            defaultValue={instrumentos?.cantidadVendida}
                            onChange={e => instrumentos.cantidadVendida = (e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Descripcion</label>
                        <input
                            type="text"
                            className="form-control"
                            id="descInst"
                            defaultValue={instrumentos?.descripcion}
                            onChange={e => instrumentos.descripcion = (e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={() =>saveInstrumento()}>Guardar</button>
                </form>

            </div>
        </>
    )
}

export default Formulario
