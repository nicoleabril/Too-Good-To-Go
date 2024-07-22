import React, { useEffect, useState } from 'react';
import '../styles/productoCards.css';
import { CarouselProvider, Slider, Slide, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const ProductosCards = ({ productos = [], nombreBoton, onBuyClick, cardStyle = {}, carruselId }) => {
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

  // Función auxiliar para mapear campos
  const mapFields = (producto) => {
    return {
      imagen: producto.imagen_oferta || producto.imagen,
      nombre: producto.nombre_oferta || producto.nombre_producto,
    };
  };

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
          {productos.map((producto, index) => {
            const { imagen, nombre } = mapFields(producto);
            return (
              <Slide index={index} key={index}>
                <div className='card' style={cardStyle}>
                  <h3>${producto.precio}</h3>
                  <div className='contenidoCard'>
                    <img src={imagen} alt={`${nombre} Logo`} />
                    <h3>{nombre}</h3>
                    <p>{producto.descripcion}</p>
                    <button onClick={() => onBuyClick(producto)}>{nombreBoton}</button>
                  </div>
                </div>
              </Slide>
            );
          })}
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

export default ProductosCards;
