import React from 'react';
import '../styles/productoCards.css';

const ProductosCards = ({ productos, nombreBoton }) => {
  return (
    <div className='contenedorCard'>
      {productos.map((producto, index) => (
        <div className='card' key={index}>
            <h3>${producto.precio}</h3> 
            <div className='contenidoCard'>
                <img src={producto.image} alt={`${producto.name} Logo`} />
                <h3>{producto.name}</h3> 
                <p>{producto.descript}</p>
                <button>{nombreBoton}</button>
            </div>
        </div>
      ))}
      <div className='card-more'>
        <button>VER MÁS</button>
      </div>
    </div>
  );
};

export default ProductosCards;
