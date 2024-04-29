import React from 'react';
import '../styles/localCards.css'
import McDonalds from '../images/McDonalds.png'
import KFC from '../images/KFC.png'
import BurgerKing from '../images/BurgerKing.png'

const LocalesCards = () => {
  

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
        <img src={KFC} alt="KFC Logo" />
        <div className='contenidoCard'>
          <h3>KFC-Mall del Río</h3>
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
        <img src={BurgerKing} alt="BurgerKing Logo" />
        <div className='contenidoCard'>
          <h3>BurgerKing</h3>
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