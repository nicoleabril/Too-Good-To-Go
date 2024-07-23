import ReactApexChart from "react-apexcharts";
import barChart from "./configs/barChart";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import React, { useState, useEffect } from 'react';
import "../styles/graficas.css";

function BarChart() {
  const idNegocio = Cookies.get('id');
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Recupera datos de la API
        const response = await axios.get(`http://localhost:8000/api/total-ordenado-mes-anio/${idNegocio}`);
        const data = response.data;

        // Transformar los datos
        const months = data.map(d => `${d.anio}-${d.mes < 10 ? '0' : ''}${d.mes}`);
        const totalOrders = data.map(d => d.total_ordenes);

        setChartData({
          series: [{
            name: 'Total de Órdenes',
            data: totalOrders
          }],
          options: {
            ...barChart.options, // Utiliza las opciones del archivo de configuración
            xaxis: {
              ...barChart.options.xaxis,
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
        className="full-width"
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height="400" // Ajusta según sea necesario
        width="100%"
      />
    </div>
  );
}

export default BarChart;
