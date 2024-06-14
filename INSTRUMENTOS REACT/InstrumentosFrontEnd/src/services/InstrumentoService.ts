import axios from "axios";
import Instrumento from "../entidades/Instrumento";
import Pedido from "../entidades/Pedido";
import PreferenceMP from "../entidades/PreferenceMP";
import DetallePedido from "../entidades/DetallePedido";
import Categoria from "../entidades/Categoria";
import Usuario from "../entidades/Usuario";

const INSTRUMENTO_BASE_REST_API_URL = "http://localhost:8080/api/instrumentos";
const PEDIDO_BASE_REST_API_URL = "http://localhost:8080/api/pedidos";
const PREFERENCE_BASE_REST_API_URL = "http://localhost:8080/api/preferenceMp/create_preference_mp";
const PEDIDO_DETALLE_BASE_REST_API_URL = "http://localhost:8080/api/detallePedido"
const PEDIDO_DETALLEALL_BASE_REST_API_URL = "http://localhost:8080/api/detallePedidoAll"
const CATEGORIAS_BASE_REST_API_URL = "http://localhost:8080/api/categorias"
const LOGIN_BASE_REST_API_URL = "http://localhost:8080/api/auth/login"
const REGISTRO_BASE_REST_API_URL = "http://localhost:8080/api/auth/registro"
const CHART_BASE_REST_API_URL = "http://localhost:8080/api/pedidoPorMes"
const CHARTPIE_BASE_REST_API_URL = "http://localhost:8080/api/cantidadPedido"

class InstrumentoService {
    getAllInstrumentos() {
        return axios.get(INSTRUMENTO_BASE_REST_API_URL);
    }

    getInstrumentosByID(id: number) {
        return axios.get(`${INSTRUMENTO_BASE_REST_API_URL}/${id}`);
    }

    saveInstrumento(instrumento: Instrumento) {
        if (instrumento && Number(instrumento.id) > 0) {
            console.log(instrumento.id);
            return axios.put(`${INSTRUMENTO_BASE_REST_API_URL}/${instrumento.id}`, instrumento);
        } else {
            console.log(instrumento.id);
            return axios.post(INSTRUMENTO_BASE_REST_API_URL, instrumento);
        }
    }

    deleteInstrumento(id: number) {
        return axios.delete(`${INSTRUMENTO_BASE_REST_API_URL}/${id}`);
    }

    createPreference(pedido: Pedido): Promise<PreferenceMP> {
        return axios.post<PreferenceMP>(PREFERENCE_BASE_REST_API_URL, pedido)
            .then(response => response.data);
    }

    savePedido(pedido: Pedido): Promise<Pedido> {
        return axios.post(PEDIDO_BASE_REST_API_URL, pedido)
            .then(response => response.data)
            .catch(error => {
                console.error("Error al guardar el pedido:", error);
                throw error; // Re-lanza el error para manejarlo en el frontend si es necesario
            });
    }

    async saveDetallePedido(detallePedido: DetallePedido): Promise<DetallePedido> {
        return axios.post(`${PEDIDO_DETALLE_BASE_REST_API_URL}`, detallePedido)
            .then(response => response.data)
            .catch(error => {
                console.error("Error al guardar el detalle del pedido:", error);
                throw error;
            });
    }

    async saveAllDetallePedido(detallePedido: DetallePedido[]): Promise<DetallePedido[]> {
        return axios.post<DetallePedido[]>(PEDIDO_DETALLEALL_BASE_REST_API_URL, detallePedido)
            .then(response => response.data)
            .catch(error => {
                console.error("Error al guardar el detalle all de pedido:", error);
                throw error; // Re-lanza el error para manejarlo en el frontend si es necesario
            });
    }

    getCategorias() {
        return axios.get<Categoria[]>(CATEGORIAS_BASE_REST_API_URL);
    }

    async loginUsuarios(usuario: Usuario): Promise<Usuario | string> {
        return axios.post<Usuario>(LOGIN_BASE_REST_API_URL, usuario)
            .then(response => response.data)
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    return 'Credenciales inválidas';
                } else {
                    throw error;
                }
            });
    }

    registrarUsuarios(usuario: Usuario) {
        return axios.post(REGISTRO_BASE_REST_API_URL, usuario);
    }

    async getChartBar(anio: number) {
        const response = await axios.get(`${CHART_BASE_REST_API_URL}?anio=${anio}`);
        return response.data;
    }

    async getChartPie() {
        const response = await axios.get(CHARTPIE_BASE_REST_API_URL);
        return response.data;
    }

    async createExcelPedidos(fechaDesde : string, fechaHasta : string) {
        try {
            const response = await axios.get(`http://localhost:8080/api/descargarExcelPedidos`, {
                params: {
                    fechaDesde: fechaDesde,
                    fechaHasta: fechaHasta
                },
                responseType: 'blob'  // Indicar que la respuesta es un archivo blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Pedidos.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error al descargar el archivo Excel:', error);
        }
    }

    async downloadPDF(id: number) {
        try {
            const response = await axios.get(`http://localhost:8080/api/downloadPDFInstrumento/${id}`, {
                responseType: 'blob', // Indicar que la respuesta es un archivo blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `instrumento_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error al descargar el archivo PDF:', error);
            throw error;
        }
    }
}

export default new InstrumentoService();