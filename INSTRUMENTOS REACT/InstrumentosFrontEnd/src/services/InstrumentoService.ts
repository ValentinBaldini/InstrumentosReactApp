import axios from "axios";
import Instrumento from "../entidades/Instrumento";
import Pedido from "../entidades/Pedido";
import PreferenceMP from "../entidades/PreferenceMP";
import DetallePedido from "../entidades/DetallePedido";

const INSTRUMENTO_BASE_REST_API_URL="http://localhost:8080/api/instrumentos";
const PEDIDO_BASE_REST_API_URL = "http://localhost:8080/api/pedidos";
const PREFERENCE_BASE_REST_API_URL = "http://localhost:8080/api/preferenceMp/create_preference_mp";
const PEDIDO_DETALLE_BASE_REST_API_URL = "http://localhost:8080/api/detallePedido"

class InstrumentoService{
    getAllInstrumentos(){
        return axios.get(INSTRUMENTO_BASE_REST_API_URL);
    }

    getInstrumentosByID(id: number){
        return axios.get(`${INSTRUMENTO_BASE_REST_API_URL}/${id}`);
    }

    saveInstrumento(instrumento : Instrumento){
        if(instrumento && Number(instrumento.id)>0){
            console.log(instrumento.id);
            return axios.put(`${INSTRUMENTO_BASE_REST_API_URL}/${instrumento.id}`, instrumento);
        }else{
            console.log(instrumento.id);
            return axios.post(INSTRUMENTO_BASE_REST_API_URL,instrumento);
        }
    }

    deleteInstrumento(id: number){
        return axios.delete(`${INSTRUMENTO_BASE_REST_API_URL}/${id}`);
    }

    createPreference(pedido: Pedido): Promise<PreferenceMP> {
        return axios.post<PreferenceMP>(PREFERENCE_BASE_REST_API_URL, pedido)
            .then(response => response.data);
    }

    savePedido(pedido : Pedido): Promise<Pedido> {
        console.log("Pedido guardado, id:",pedido.id);
        return axios.post(PEDIDO_BASE_REST_API_URL, pedido)
    }

    saveDetallePedido (detalles : DetallePedido) : Promise<DetallePedido>{
        return axios.post(PEDIDO_DETALLE_BASE_REST_API_URL, detalles)
    }
}

export default new InstrumentoService();