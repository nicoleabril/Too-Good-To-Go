import React from 'react';
import pizza from '../images/pizza.png';
import LocalesCards from './LocalesCards';
import McDonalds from '../images/McDonalds.png';
import KFC from '../images/KFC.png';
import BurgerKing from '../images/BurgerKing.png';
import MapComponent from './MapComponent'; 
import '../styles/cliente.css';

function HomeCliente() {
  const localesData = [
    {
      name: 'McDonalds-Remigio',
      image: McDonalds,
      rating: '4.5',
      reviews: '225',
      satisfaction: '99.9',
      menu: ['Burgers', 'Papas fritas', 'Malteadas']
    },
    {
      name: 'KFC-Mall del Río',
      image: KFC,
      rating: '4.5',
      reviews: '225',
      satisfaction: '99.9',
      menu: ['Burgers', 'Papas fritas', 'Malteadas']
    },
    {
      name: 'BurgerKing',
      image: BurgerKing,
      rating: '4.5',
      reviews: '225',
      satisfaction: '99.9',
      menu: ['Burgers', 'Papas fritas', 'Malteadas']
    }
  ];
  
  return (
    <div>
      <div className='textoImagen'>
        <h1 className='texto1'>Tu comida favorita</h1>
        <h1 className='texto2'>al mejor precio</h1>
        <p className='subtexto'>Revisa todas las ofertas. ¡Seguro te encantarán!</p>
      </div>
      <div className="imagenPizza">
        <img src={pizza} alt="Pizza" className="imagen2" />
      </div>
      <div className="waves-background2"></div>
      <div className="contenedorRojo"></div>
      <div className="contenedorBlanco">
        <h1>OFERTAS</h1>
        <div className="linea"></div>
        <LocalesCards locales={localesData} nombreBoton={'VER OFERTAS'} />
        <h1>Negocios</h1>
        <LocalesCards locales={localesData} nombreBoton={'COMPRAR AHORA'} />
        <h1>¿Buscas de lo siempre?</h1>
        <LocalesCards locales={localesData} nombreBoton={'COMPRAR AHORA'} />
        <h1>Localización</h1>
        <MapComponent/>
       
      </div>
      <div className="contenedorFooter">
        <div className="textoFooter2">
          Copyright © 2024 Too Good To Go International. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default HomeCliente;
