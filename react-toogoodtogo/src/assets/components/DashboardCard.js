import React from 'react';
import '../styles/dashboardCards.css';

const DashboardCards = ({ platos }) => {
  return (
    <div className='contenedorCardDashboard'>
      {platos.map((producto, index) => (
        <div className='card' key={index}>
            <div className='contenidoCard'>
                <div id='imagenPlato'>
                    <img src={producto.image} alt={`${producto.name} Logo`} />
                </div>
                <div id='infoPlato'>
                    <h3>{producto.name}</h3> 
                    <div>
                        <p class="inline">{producto.descript}</p>
                        <p id='textoGris' class="inline">{producto.sales}</p>
                    </div>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;