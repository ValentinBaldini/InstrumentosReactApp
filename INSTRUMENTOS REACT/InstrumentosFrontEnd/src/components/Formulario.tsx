import { useNavigate, useParams } from "react-router-dom"
import Navbar from "./navbar"
import { useEffect, useState } from "react";
import Instrumento from "../entidades/Instrumento";
import InstrumentoService from "../services/InstrumentoService";
import Categoria from "../entidades/Categoria";

const Formulario = () => {

    const { idInstrumento } = useParams();
    const [instrumentos, setInstrumentos] = useState<Instrumento>(new Instrumento());
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const navigate = useNavigate();
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [nombreImagen, setNombreImagen] = useState("");

    useEffect(() => {
        getInstrumentos();
        getCategorias();
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

    const getCategorias = async () => {
        InstrumentoService.getCategorias().then(response => {
            setCategorias(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const saveInstrumento = async () => {
        if (instrumentos.instrumento === "" || instrumentos.instrumento == undefined) {
            alert("Debe ingresar el nombre del instrumento");
            return;
        }
        if (instrumentos.marca === "") {
            alert("Debe ingresar la marca del instrumento");
            return;
        }
        if (instrumentos.modelo === "") {
            alert("Debe ingresar el modelo del instrumento");
            return;
        }
        if (instrumentos.cantidadVendida === "") {
            alert("Debe ingresar el modelo del instrumento");
            return;
        }
        if (instrumentos.categoria?.id === undefined) {
            alert("Debe ingresar la categoria del instrumento");
            return;
        }
        if (instrumentos.precio === "") {
            alert("Debe ingresar el precio del instrumento");
            return;
        }
        if (instrumentos.costoEnvio === "") {
            alert("Debe ingresar el costo de envio del instrumento");
            return;
        }
        if (instrumentos.descripcion === "") {
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

    const handleCategoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoria = categorias.find(categoria => categoria.id === Number(event.target.value));
        setInstrumentos(prevState => ({
            ...prevState,
            categoria: selectedCategoria
        }));
    }

    const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenSeleccionada(reader.result); // Mostrar la imagen seleccionada en la UI
                setNombreImagen(file.name); // Guardar el nombre de la imagen
                setInstrumentos((prevState) => ({
                    ...prevState,
                    imagen: file.name, // Asignar el nombre de la imagen a instrumentos.imagen
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nombreInst" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombreInst"
                                    defaultValue={instrumentos?.instrumento}
                                    onChange={(e) => setInstrumentos({ ...instrumentos, instrumento: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="marcaInst" className="form-label">Marca</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="marcaInst"
                                    defaultValue={instrumentos?.marca}
                                    onChange={(e) => setInstrumentos({ ...instrumentos, marca: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="modeloInst" className="form-label">Modelo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="modeloInst"
                                    defaultValue={instrumentos?.modelo}
                                    onChange={(e) => setInstrumentos({ ...instrumentos, modelo: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precioInst" className="form-label">Precio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="precioInst"
                                    defaultValue={instrumentos?.precio}
                                    onChange={(e) => setInstrumentos({ ...instrumentos, precio: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="costoInst" className="form-label">Costo Envío ('G'=Gratis)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="costoInst"
                                    defaultValue={instrumentos?.costoEnvio}
                                    onChange={(e) => setInstrumentos({ ...instrumentos, costoEnvio: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descInst" className="form-label">Descripción</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="descInst"
                                    defaultValue={instrumentos?.descripcion}
                                    onChange={(e) => setInstrumentos({ ...instrumentos, descripcion: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="imagen" className="form-label">Imagen:</label><br />
                                {imagenSeleccionada && (
                                    <img src={imagenSeleccionada as string} alt="imagen seleccionada" width="160" />
                                )}
                                {!imagenSeleccionada && (
                                    <img src={"img/" + instrumentos.imagen} alt="imagenInstrumento" width="160" />
                                )}
                                <input type="file" className="form-control mx-auto w-50 mt-2" name="imagen" onChange={handleImagenChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cantidadVendida" className="form-label">Cantidad Vendida</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cantidadVendida"
                                    defaultValue={instrumentos?.cantidadVendida}
                                    onChange={(e) => setInstrumentos({ ...instrumentos, cantidadVendida: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoriaInst" className="form-label">Categoría</label>
                                <select
                                    className="form-control"
                                    id="categoriaInst"
                                    name="categoria"
                                    value={instrumentos.categoria?.id || ""}
                                    onChange={handleCategoriaChange}
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.denominacion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={saveInstrumento}>Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Formulario
