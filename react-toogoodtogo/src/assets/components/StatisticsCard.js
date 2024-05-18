import React from 'react';
import '../styles/statisticsCards.css';

const StatisticsCards = ({ datos }) => {
  return (
    <div className='contenedorStatisticDashboard'>
      {datos.map((producto, index) => (
        <div className='card' key={index}>
            <div className='contenidoCard'>
                <div id='iconoEstadistica'>
                  {producto.icon}
                </div>
                <div id='infoPlato'>
                    <h3>{producto.number}</h3> 
                    <div>
                        <p class="inline">{producto.name}</p>
                    </div>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
