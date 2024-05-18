import React from 'react';
import '../styles/graficaCard.css';
import AreaChart from '../charts/AreaChart';
const GraficaCard = ({ datos }) => {
    const index = 0;
  return (
    <div className='contenedorGraficaDashboard'>
        <div className='card' key={index}>
            <div className='contenidoCard'>
                <AreaChart />
            </div>
        </div>
    </div>
  );
};

export default GraficaCard;
