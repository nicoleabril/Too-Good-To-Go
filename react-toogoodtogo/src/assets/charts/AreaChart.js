import ReactApexChart from "react-apexcharts";
import "../styles/graficas.css";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import React, { useState, useEffect } from 'react';
import lineChart from './configs/areaChart'; // Asegúrate de que la ruta sea correcta

function AreaChart() {
  const idNegocio = Cookies.get('id');
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Recupera datos de la API
        const response = await axios.get(`http://localhost:8000/api/cantidad-clientes-mes-anio/${idNegocio}`);
        const data = response.data;

        // Transformar los datos
        const months = data.map(d => `${d.anio}-${d.mes < 10 ? '0' : ''}${d.mes}`);
        const quantities = data.map(d => d.cantidad_clientes);

        setChartData({
          series: [{
            name: 'Clientes Nuevos',
            data: quantities
          }],
          options: {
            ...lineChart.options, // Utiliza las opciones del archivo de configuración
            xaxis: {
              ...lineChart.options.xaxis,
              categories: months // Actualiza las categorías del eje X con los meses transformados
            }
          }
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, [idNegocio]);

  return (
    <div className="chart-container">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height="400" // Ajusta según sea necesario
        width="100%"
      />
    </div>
  );
}

export default AreaChart;
