package com.example.InstrumentosBackEnd.controlador;

import com.example.InstrumentosBackEnd.modelo.Pedido;
import com.example.InstrumentosBackEnd.modelo.PreferenceMP;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/preferenceMp")
public class MercadoPagoController {

    public PreferenceMP getPreferenciaIdMercadoPago(Pedido pedido) {
        try {
            MercadoPagoConfig.setAccessToken("TEST-4334004484678043-061010-a7c47b044519af7541a47dc177e9c3f6-553770515");
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .id(pedido.getId().toString())
                    .title("Compra de Mercado Pago")
                    .description("Compra realizada de instrumentos carrito")
                    .currencyId("ARG")
                    .quantity(1)
                    .unitPrice(new BigDecimal(pedido.getTotalPedido()))
                    .build();
            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            PreferenceBackUrlsRequest backURL = PreferenceBackUrlsRequest.builder().success("http://localhost:5173/")
                    .failure("http://localhost:5173/instrumentos").build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backURL)
                    .build();
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            PreferenceMP preferenceMpEntity = new PreferenceMP();
            preferenceMpEntity.setIdPreference(preference.getId());
            preferenceMpEntity.setStatusCode(preference.getResponse().getStatusCode());

            System.out.println("ID de preferencia: " + preferenceMpEntity.getIdPreference());

            return preferenceMpEntity;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @PostMapping("/create_preference_mp")
    public PreferenceMP createPreferenciaMercadoPago(@RequestBody Pedido pedido) throws MPException, MPApiException {
        System.out.println("Pedido recibido desde el cliente:");
        System.out.println("ID: " + pedido.getId());
        System.out.println("Fecha pedido: " + pedido.getFechaPedido());
        System.out.println("Total pedido: " + pedido.getTotalPedido());
        MercadoPagoController cMercadoPago = new MercadoPagoController();
        PreferenceMP preferenceMP = cMercadoPago.getPreferenciaIdMercadoPago(pedido);
        return preferenceMP;
    }
}
