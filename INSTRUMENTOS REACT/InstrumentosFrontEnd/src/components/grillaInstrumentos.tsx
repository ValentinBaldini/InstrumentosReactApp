import Navbar from "./navbar"
import './css/grilla.css'
import { ChangeEvent, Suspense, useEffect, useState } from "react"
import InstrumentoService from "../services/InstrumentoService"
import Instrumento from "../entidades/Instrumento"
import LoaderPage from "./LoaderPage"
import { Rol } from "../entidades/Rol"
import Usuario from "../entidades/Usuario"
import { useNavigate } from "react-router-dom"
import { Button, FormControl, Modal, Form, Row, Col } from "react-bootstrap"

const Spinner = () => (
    <LoaderPage></LoaderPage>
)

const GrillaInstrumentos = () => {
    const [instrumentos, setInstrumentos] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const [timeoutReached, setTimeoutReached] = useState(false);
    const navigate = useNavigate();
    const [fechaDesde, setFechaDesde] = useState<string | undefined>(undefined);
    const [fechaHasta, setFechaHasta] = useState<string | undefined>(undefined);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [todosPedidos, setTodosPedidos] = useState<boolean>(false);

    //Traigo el usuario logueado
    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;

    useEffect(() => {
        setRefresh(!refresh);
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutReached(true); // Cambia el estado cuando se alcanza el tiempo de espera
        }, 10000); // 10 segundos de tiempo de espera
        InstrumentoService.getAllInstrumentos().then(response => {
            setInstrumentos(response.data);
            setLoading(false); // Cambia el estado cuando los datos están cargados
            clearTimeout(timer);
            console.log("Instrumentos cargados:", response.data);
        }).catch(error => {
            console.log(error);
        })
        return () => clearTimeout(timer);
    }, [refresh]);

    const deleteInstrumento = async (id: number) => {
        InstrumentoService.deleteInstrumento(id).then(response => {
            console.log("Instrumento eliminado: ", response.data);
            setRefresh(!refresh);
        }).catch(error => {
            console.log(error);
        })
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDownloadExcelPedidos = async () => {
        if (fechaDesde && fechaHasta) {
            const fechaDesdeDate = new Date(fechaDesde);
            const fechaHastaDate = new Date(fechaHasta);

            // Formatear las fechas en el formato esperado yyyy-MM-dd
            const formattedFechaDesde = formatDate(fechaDesdeDate);
            const formattedFechaHasta = formatDate(fechaHastaDate);

            await InstrumentoService.createExcelPedidos(formattedFechaDesde, formattedFechaHasta)
        } else {
            alert('Por favor, seleccione ambas fechas.');
        }
        handleCloseModal(); // Cerrar el modal después de descargar el Excel
    };

    // Función para manejar el cambio de fechaDesde
    const handleFechaDesdeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value; // Obtener el valor de entrada
        setFechaDesde(value); // Establecer directamente el valor en el estado
    };

    // Función para manejar el cambio de fechaHasta
    const handleFechaHastaChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value; // Obtener el valor de entrada
        setFechaHasta(value); // Establecer directamente el valor en el estado
    };

    // Función para manejar el cambio del checkbox
    const handleTodosPedidosChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodosPedidos(event.target.checked);
        if (event.target.checked) {
            setFechaDesde("2024-01-01");
            setFechaHasta("2025-01-01");
        } else {
            setFechaDesde(undefined);
            setFechaHasta(undefined);
        }
    };

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <Navbar></Navbar>
            <Suspense fallback={<Spinner></Spinner>}>
                <body className="bodyGrilla">
                    <div className='containerGrilla'>
                        <h1 className="h1Grilla">INSTRUMENTOS</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Cantidad Vendida</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Envio</th>
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
                                            <td>{instrumento.categoria?.denominacion}</td>
                                            <td>{instrumento.cantidadVendida}</td>
                                            <td>${instrumento.precio}</td>
                                            <td>{instrumento.costoEnvio}</td>
                                            <td>
                                                {
                                                    (usuarioLogueado.rol == Rol.ADMIN)

                                                        ? <div><a href={`/formulario/` + instrumento.id}><button className="btn btn-warning" style={{ marginBottom: '10px' }}>Modificar</button></a>
                                                            <button className="btn btn-danger" style={{ marginBottom: '10px' }} onClick={() => deleteInstrumento(Number(instrumento.id))}>Eliminar</button></div>
                                                        : <div></div>
                                                }
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        {
                            (usuarioLogueado.rol == Rol.ADMIN)
                                ? <a href={`/formulario/` + 0}><button className="btn btn-success" style={{ marginBottom: '10px' }}>Nuevo</button></a>
                                : <></>
                        }
                    </div>
                    <button className="btn btn-success" onClick={() => handleShowModal()}>Generar Excel</button>
                    {/* Modal para seleccionar fechas */}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Seleccionar rango de fechas</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="fechaDesde">
                                <Form.Label>Desde:</Form.Label>
                                <FormControl type="date" value={fechaDesde || ''} onChange={handleFechaDesdeChange} />
                            </Form.Group>
                            <Form.Group controlId="fechaHasta">
                                <Form.Label>Hasta:</Form.Label>
                                <FormControl type="date" value={fechaHasta || ''} onChange={handleFechaHastaChange} />
                            </Form.Group>
                            <Form.Group controlId="todosPedidos">
                                <Form.Check type="checkbox" label="Todos los pedidos" checked={todosPedidos} onChange={handleTodosPedidosChange} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                            <Button variant="primary" onClick={handleDownloadExcelPedidos}>Descargar</Button>
                        </Modal.Footer>
                    </Modal>
                </body>
            </Suspense>
        </>
    )
}

export default GrillaInstrumentos
