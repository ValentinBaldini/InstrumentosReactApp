import axios from "axios";

const INSTRUMENTO_BASE_REST_API_URL="http://localhost:8080/api/instrumentos";

class InstrumentoService{
    getAllInstrumentos(){
        return axios.get(INSTRUMENTO_BASE_REST_API_URL);
    }

    getInstrumentosByID(id: number){
        return axios.get(INSTRUMENTO_BASE_REST_API_URL + "/" + id);
    }
}

export default new InstrumentoService();