import React from 'react';
import '../styles/servicioCards.css';

const ServicioCards = ({ productos, nombreBoton }) => {
  return (
    <div className='contenedorCard'>
      {productos.map((producto, index) => (
        <div className='cardService' key={index}>
            <div className='contenidoCardService'>
                <img src={producto.image} alt={`${producto.name} Logo`} />
                <h3>{producto.name}</h3> 
                <p>{producto.descript}</p>
                <a href={producto.link}><button className='buttonSerParte'>{nombreBoton}</button></a>
            </div>
        </div>
      ))}
    </div>
  );
};

export default ServicioCards;
