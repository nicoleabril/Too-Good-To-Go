import React from 'react';
import '../styles/localCards.css';

const LocalesCards = ({ locales, nombreBoton }) => {

  const verNegocio = (id) => {
    sessionStorage.setItem('id_negocio', id);
};
  

  return (
    <div className='contenedorCard'>
      {locales.map((local, index) => (
        <div className='card' key={index}>
          <img src={local.image} alt={`${local.name} Logo`} />
          <div className='contenidoCard'>
            <h3>{local.name}</h3>
            <p>{local.rating}⭐</p>
            <p>{local.reviews}+ comentarios</p>
            <p>{local.satisfaction}% de tasa de satisfacción</p>
            <p>Ofrecemos:</p>
            <ul>
              {local.menu.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <a href={local.link}><button onClick={verNegocio(local.id_negocio)}>{nombreBoton}</button></a>
          </div>
        </div>
      ))}
      <div className='card-more'>
        <button>VER MÁS</button>
      </div>
    </div>
  );
};

export default LocalesCards;
