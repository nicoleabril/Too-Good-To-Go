import React from 'react';
import '../styles/graficaCard.css';
import AreaChart from '../charts/AreaChart';
const GraficaCard = ({ selectedIndex }) => {
  const index = 0;
  return (
    <div className='contenedorGraficaDashboard'>
        <div className='card' key={index}>
            <div className='contenidoCard'>
              {selectedIndex === 0 && <AreaChart /> }
              {selectedIndex === 1 && <AreaChart /> }
              {selectedIndex === 2 && <AreaChart /> }
            </div>
        </div>
    </div>
  );
};

export default GraficaCard;
