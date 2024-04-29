import React from 'react';
import '../styles/localCards.css'
import McDonalds from '../images/McDonalds.png'
const LocalesCards = () => {
  const restaurants = [
    {
      name: 'Kung Fu Tea',
      rating: 3.8,
      comments: '250+',
      description: 'Batidos y bebidas con un toque especial.',
    },
    {
      name: "Domino's",
      rating: 4.0,
      comments: '78+',
      description: 'Pizza realizada con los mejores ingredientes para su paladar.',
    },
    {
      name: "Victoriano's Pizza",
      rating: 4.1,
      comments: '28+',
      description: 'Pizza como si fuera hecha en casa.',
    },
    {
      name: 'Las Empanadas del Paco',
      rating: 4.7,
      comments: '198+',
      description: 'Empanadas de distintos sabores, todas deliciosas.',
    },
  ];

  return (
    <div className='contenedorCard'>
      <div className='card'>
        <img src={McDonalds} alt="McDonald's Logo" />
        <div className='contenidoCard'>
          <h3>McDonalds-Remigio</h3>
          <p>4.5⭐</p>
          <p>225+ comentarios</p>
          <p>99.9% de tasa de satisfacción</p>
          <p>Ofrecemos:</p>
          <ul>
            <li>-Burgers</li>
            <li>-Papas fritas</li>
            <li>-Malteadas</li>
          </ul>
          <button>VER OFERTAS</button>
        </div>
      </div>
      <div className='card'>
        <img src={McDonalds} alt="McDonald's Logo" />
        <div className='contenidoCard'>
          <h3>McDonalds-Remigio</h3>
          <p>4.5⭐</p>
          <p>225+ comentarios</p>
          <p>99.9% de tasa de satisfacción</p>
          <p>Ofrecemos:</p>
          <ul>
            <li>-Burgers</li>
            <li>-Papas fritas</li>
            <li>-Malteadas</li>
          </ul>
          <button>VER OFERTAS</button>
        </div>
      </div>
      <div className='card'>
        <img src={McDonalds} alt="McDonald's Logo" />
        <div className='contenidoCard'>
          <h3>McDonalds-Remigio</h3>
          <p>4.5⭐</p>
          <p>225+ comentarios</p>
          <p>99.9% de tasa de satisfacción</p>
          <p>Ofrecemos:</p>
          <ul>
            <li>-Burgers</li>
            <li>-Papas fritas</li>
            <li>-Malteadas</li>
          </ul>
          <button>VER OFERTAS</button>
        </div>
      </div>
      <div className='card-more'>
          <button>VER MÁS</button>
      </div>
    </div>
  );
  
};

export default LocalesCards;