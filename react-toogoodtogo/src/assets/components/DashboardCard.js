import React from 'react';
import '../styles/dashboardCards.css';

const DashboardCards = ({ platos }) => {
  return (
    <div className='contenedorCardDashboard'>
      <h1>Más Vendidos</h1>
      {platos.map((producto, index) => (
        <div className='card' key={index}>
            <div className='contenidoCard'>
                <div id='imagenPlato'>
                    <img src={producto.image} alt={`${producto.name} Logo`} />
                </div>
                <div id='infoPlato'>
                    <h3>{producto.name}</h3> 
                    <div className='descripcionPlato'>
                        <p class="inline">{producto.descript}</p>
                        <p id='textoGris' class="inline">| {producto.sales} ventas</p>
                    </div>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
