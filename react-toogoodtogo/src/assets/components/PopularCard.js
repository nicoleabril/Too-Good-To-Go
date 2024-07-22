import React, { useEffect, useState } from 'react';
import '../styles/productoCards.css';
import { CarouselProvider, Slider, Slide, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css'; // Importa los estilos

const PopularCard = ({ productos, nombreBoton, carruselId }) => {
  const [visibleSlides, setVisibleSlides] = useState(3);

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
    <div className='contenedorCardProducto'>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={170}
        totalSlides={productos.length}
        visibleSlides={visibleSlides}
        step={1}
        infinite
        orientation={window.innerWidth <= 820 ? 'vertical' : 'horizontal'}
        className='carousel-container'
        id={carruselId}
      >
        <Slider>
          {productos.map((producto, index) => (
            <Slide index={index} key={index}>
              <div className='card' key={index}>
                  <h3>${producto.precio}</h3> 
                  <div className='contenidoCard'>
                      <img src={producto.imagen} alt={`${producto.nombre_producto} Logo`} />
                      <h3>{producto.nombre_producto}</h3> 
                      <p>{producto.descripcion}</p>
                      <a href='/RegistroProductos/EditarProducto'><button >{nombreBoton}</button></a>
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

export default PopularCard;
