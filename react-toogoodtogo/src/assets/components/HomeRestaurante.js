import React from 'react';
import '../styles/restaurante.css';
import donas from '../images/donas.png';
import dunkin_logo from '../images/dunkin_donuts_logo.jpeg';
import bolsa from '../images/bolsa.jpeg';
import combo1 from '../images/combo1.jpeg';
import combo2 from '../images/combo2.jpeg';
import combo3 from '../images/combo3.jpeg';
import bebida1 from '../images/bebida1.jpeg';
import bebida2 from '../images/bebida2.jpeg';
import bebida3 from '../images/bebida3.jpeg';
import sanduche1 from '../images/sanduche1.jpeg';
import sanduche2 from '../images/sanduche2.jpeg';
import sanduche3 from '../images/sanduche3.jpeg';
import ProductosCards from './ProductoCards';
import perfilMujer from '../images/perfilMujer.jpg';
import { addProductoComprado } from './productosComprados';

const HomeRestaurante = ({ onBuyClick }) => {
  const ofertasData = [
    { precio: '6.99', name: 'Oferta #1', descript: 'Esta bolsa sorpresa está valorada en $11,99', image: bolsa ,cantidadVendida: 1},
    { precio: '4.99', name: 'Oferta #2', descript: 'Esta bolsa sorpresa está valorada en $7,99', image: bolsa, cantidadVendida: 1},
    { precio: '9.99', name: 'Oferta #3', descript: 'Esta bolsa sorpresa está valorada en $31,99', image: bolsa, cantidadVendida: 1},
  ];
  const combosData = [
    { precio: '25.99', name: 'Oferta #1', descript: '¡Disfruta de las donuts más famosas del mundo! Elige tus 12 donas favoritas.', image: combo1 ,cantidadVendida: 1},
    { precio: '17.99', name: 'Oferta #2', descript: 'Desayuno para cuatro, incluye: 4 Cubanitos a elección + 1 Party Box + 4 Té helados Medianos.', image: combo2, cantidadVendida: 1},
    { precio: '20.99', name: 'Oferta #3', descript: 'Elige tus 50 antojitos favoritos y disfruta de una variedad de sabores únicos.', image: combo3, cantidadVendida: 1},
  ];
  const bebidasData = [
    { precio: '1.50', name: 'Té Helado Grande', descript: 'Despierta tus sentidos y réfrescate con nuestro famosos Té Helado Dunkin', image: bebida1 ,cantidadVendida: 1 },
    { precio: '3.50', name: 'Iced Latte', descript: 'Despierta tus sentidos y refréscate con nuestro famoso Iced Latte Dunkin.', image: bebida2,cantidadVendida: 1 },
    { precio: '3.75', name: 'Chocolate Frío', descript: 'La combinación ideal de frío y dulzura de nuestro chocolate Dunkin.', image: bebida3,cantidadVendida: 1 },
  ];
  const sanduchesData = [
    { precio: '1.99', name: 'Cubanitos', descript: 'Sánduche de pan flauta con jamón y queso', image: sanduche1 ,cantidadVendida: 1},
    { precio: '2.99', name: 'Donut Sandwich', descript: 'Sánduche de donut glaseada con huevo, queso y tocino.', image: sanduche2,cantidadVendida: 1 },
    { precio: '2.99', name: 'Croissant de Jamón y Queso.', descript: 'Croissant de Jamón y Queso.', image: sanduche3 ,cantidadVendida: 1},
  ];

  const handleBuyClick = (producto) => {
    if (onBuyClick) {
      onBuyClick(producto); // Llama a la función pasada como prop
    }
    addProductoComprado(producto); // Añade el producto a productosComprados
  };

  return (
    <div className="RestauranteContainer">
      <div className='textoImagen'>
        <img src={dunkin_logo} alt="Pizza" className="imagenLogo" />
        <div className='textoRestaurante'>
          <p className='subtexto'>Dunkin' Donuts ofrece una amplia variedad de productos, incluyendo donas, café, bebidas frías y calientes, sándwiches de desayuno, bagels, muffins y otros productos de panadería.</p>
        </div>
        <div className="comentario">
          <div className="cliente">
            <div className='fotoCliente'>
              <img src={perfilMujer} alt="Foto del cliente" />
            </div>
            <div className='textoComentario'>
              <h3>Juliana Abril</h3>
              ⭐⭐⭐⭐⭐
              <div className="contenido">
                <p>Excelente! Las donas me encantaron 10/10. Lo volveré a pedir.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="imagenPizza">
        <img src={donas} alt="Pizza" className="imagen2" />
      </div>
      <div className="waves-background2"></div>
      <div className="contenedorRojo"></div>
      <div className="contenedorBlanco">
        <h1>OFERTAS</h1>
        <div className="linea"></div>
        <ProductosCards productos={ofertasData} nombreBoton={'COMPRAR AHORA'} onBuyClick={handleBuyClick} />
        <h1>Combos</h1>
        <ProductosCards productos={combosData} nombreBoton={'COMPRAR AHORA'} onBuyClick={handleBuyClick} />
        <h1>Bebidas</h1>
        <ProductosCards productos={bebidasData} nombreBoton={'COMPRAR AHORA'} onBuyClick={handleBuyClick} />
        <h1>Sánduches</h1>
        <ProductosCards productos={sanduchesData} nombreBoton={'COMPRAR AHORA'} onBuyClick={handleBuyClick} />
      </div>
      <div className="contenedorFooter">
        <div className="textoFooter2">
          Copyright © 2024 Too Good To Go International. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default HomeRestaurante;
