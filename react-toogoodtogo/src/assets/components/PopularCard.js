import React from 'react';
import '../styles/productoCards.css';

const PopularCard = ({ productos, nombreBoton  }) => {
  return (
    <div className='contenedorCardProducto'>
      {productos.map((producto, index) => (
        <div className='card' key={index}>
            <h3>${producto.precio}</h3> 
            <div className='contenidoCard'>
                <img src={producto.image} alt={`${producto.name} Logo`} />
                <h3>{producto.name}</h3> 
                <p>{producto.descript}</p>
                <a href={producto.link}><button >{nombreBoton}</button></a>
            </div>
        </div>
      ))}
      <div className='card-more-prd'>
        <button>VER MÁS</button>
      </div>
    </div>
  );
};

export default PopularCard;
