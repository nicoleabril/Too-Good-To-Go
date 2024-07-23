import ReactApexChart from "react-apexcharts";
import eChart from "./configs/eChart";
import "../styles/graficas.css";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import React, { useState, useEffect } from 'react';

function EChart() {
  const idNegocio = Cookies.get('id');
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        // Recupera datos de la API
        const response = await axios.get(`http://localhost:8000/api/total-ingreso-mes-anio/${idNegocio}`);
        const data = response.data;

        // Transformar los datos para el gráfico de pastel
        const labels = data.map(d => `${d.anio}-${d.mes < 10 ? '0' : ''}${d.mes}`); // Usar año-mes como etiqueta
        const values = data.map(d => d.total_ingreso); // Usar la cantidad de ingresos como datos del gráfico

        setChartData({
          series: values,
          options: {
            ...eChart.options, // Utiliza las opciones del archivo de configuración
            labels: labels // Configura las etiquetas del gráfico
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
        type="pie"
        height="400" // Ajusta según sea necesario
        width="100%"
      />
    </div>
  );
}

export default EChart;
