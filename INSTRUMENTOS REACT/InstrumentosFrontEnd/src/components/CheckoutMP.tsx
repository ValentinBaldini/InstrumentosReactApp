import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import InstrumentoService from '../services/InstrumentoService';
import Pedido from '../entidades/Pedido';
import { useState } from 'react';

const CheckoutMP = ({montoTotal = 0}) => {

    const [idPreference, setIdPreference] = useState<string>("");

    //Public Key FRONTEND
    initMercadoPago('TEST-4101ce2a-69bf-47f1-bf66-3829064a7e5e', {locale: "es-AR"});

    const getPreferenceMP = async () => {
        if (montoTotal > 0) {
            const pedido = new Pedido();
            pedido.totalPedido = montoTotal;
            pedido.fechaPedido = new Date();
            try {
                const response = await InstrumentoService.createPreference(pedido);
                console.log("Id preference: ", response.idPreference);
                setIdPreference(response.idPreference);
            } catch (error) {
                console.error('Error fetching preference:', error);
            }
        } else {
            alert("Debes agregar al menos un instrumento!");
        }
    }

    return (
        <div>
            <button className='btn btn-primary' onClick={()=>getPreferenceMP()}>Pagar con MercadoPago</button>
            <div>
            {idPreference && <Wallet initialization={{ preferenceId: idPreference }} />}
            </div>
        </div>
    )
}

export default CheckoutMP
