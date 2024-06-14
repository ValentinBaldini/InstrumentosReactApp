import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { Chart as GoogleChart } from "react-google-charts";
import InstrumentoService from "../services/InstrumentoService";
import './css/chart.css'

export const optionsBar = {
    title: "Pedidos agrupados por mes en 2024"
};

export const optionsPie = {
    title: "Cantidad de pedidos agrupados por Instrumento",
    pieHole: 0.4, // Esto crea un agujero en el centro del gráfico de pastel
    is3D: true,
};

export default function PedidosChart() {
    const [datosChartBar, setDatosChartBar] = useState<any[]>([]);
    const [datosChartPie, setDatosChartPie] = useState<any[]>([]);

    const getBarChart = async (anio: number) => {
        try {
            const chartBackend = await InstrumentoService.getChartBar(anio);
            console.log(chartBackend);

            // Verifica la estructura de los datos
            if (Array.isArray(chartBackend) && chartBackend.length > 0) {
                // Formatea los datos correctamente para Google Charts
                const formattedData = [["Mes y Año", "Cantidad de Pedidos"], ...chartBackend.map(item => [String(item[0]), Number(item[1])])];
                setDatosChartBar(formattedData);
            } else {
                console.error("Datos del gráfico no tienen la estructura esperada.");
            }
        } catch (error) {
            console.error("Error al obtener datos del gráfico:", error);
        }
    };

    const getPieChart = async () => {
        try {
            const data = await InstrumentoService.getChartPie();
            const formattedData = data.map(item => [item.instrumentoNombre, item.cantidadPedidos]);
            console.log(data);
            setDatosChartPie([['Instrumento', 'Cantidad de Pedidos'], ...formattedData]);
        } catch (error) {
            console.error('Error al obtener datos para el gráfico de pie:', error);
        }
    };

    useEffect(() => {
        getBarChart(2024);
        getPieChart();
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div className="chartContainer">
                <GoogleChart
                    chartType="BarChart"
                    width="100%"
                    height="400px"
                    data={datosChartBar}
                    options={optionsBar}
                />
                <GoogleChart
                    chartType="PieChart"
                    data={datosChartPie}
                    options={optionsPie}
                    width={"100%"}
                    height={"400px"}
                />
            </div>
            <a href="/home" className="btn btn-dark">Volver al inicio</a>
        </>
    );
}