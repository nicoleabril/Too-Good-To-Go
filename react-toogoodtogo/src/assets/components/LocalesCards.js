import React, { useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css'; // Importa los estilos

import '../styles/localCards.css';

const LocalesCards = ({ locales, nombreBoton, carruselId}) => {
  const [visibleSlides, setVisibleSlides] = useState(3);

  const verNegocio = (id) => {
    sessionStorage.setItem('id_negocio', id);
  };

  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.innerWidth <= 820) {
        setVisibleSlides(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(3);
      }
    };

    window.addEventListener('resize', updateVisibleSlides);
    updateVisibleSlides();

    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);


  return (
    <div className='contenedorCardLocales'>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={170}
        totalSlides={locales.length}
        visibleSlides={visibleSlides}
        step={1}
        infinite
        orientation={window.innerWidth <= 820 ? 'vertical' : 'horizontal'}
        className='carousel-container'
        id={carruselId}
      >
        <Slider>
          {locales.map((local, index) => (
            <Slide index={index} key={index}>
              <div className='card'>
                <img src={local.image} alt={`${local.name} Logo`} />
                <div className='contenidoCard'>
                  <h3>{local.name}</h3>
                  <p>{local.rating}⭐</p>
                  <p>{local.reviews}+ comentarios</p>
                  <p>{local.satisfaction}% de tasa de satisfacción</p>
                  <p>Ofrecemos:</p>
                  <ul>
                    {Array.isArray(local.categorias) && local.categorias.length > 0 ? (
                      local.categorias.slice(0, 3).map((categoria, catIndex) => (
                        <li key={catIndex}>{categoria.nombre_categoria}</li>
                      ))
                    ) : (
                      <li>No hay categorías disponibles</li>
                    )}
                  </ul>
                  <a href={local.link}>
                    <button onClick={() => verNegocio(local.id_negocio)}>{nombreBoton}</button>
                  </a>
                </div>
              </div>
            </Slide>
          ))}
        </Slider>
        <div className='carousel-controls'>
          <ButtonNext className={`carousel-next-${carruselId} carousel-next-hidden`}>Next</ButtonNext>
        </div>
      </CarouselProvider>
      <div className='card-more'>
        <button onClick={() => document.querySelector(`.carousel-next-${carruselId}`).click()}>VER MÁS</button>
      </div>
    </div>
  );
};

export default LocalesCards;
