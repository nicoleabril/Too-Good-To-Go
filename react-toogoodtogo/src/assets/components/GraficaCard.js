import React from 'react';
import '../styles/graficaCard.css';
import AreaChart from '../charts/AreaChart';
import BarChart from '../charts/BarChart';
import EChart from '../charts/EChart';
const GraficaCard = ({ selectedIndex }) => {
  const index = 0;
  return (
    <div className='contenedorGraficaDashboard'>
      <h1>Análisis</h1>
        <div className='card' key={index}>
            <div className='contenidoCard'>
              {selectedIndex === 0 && <AreaChart /> }
              {selectedIndex === 1 && <BarChart /> }
              {selectedIndex === 2 && <EChart /> }
            </div>
        </div>
    </div>
  );
};

export default GraficaCard;
