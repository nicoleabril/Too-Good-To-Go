import React, { useState, useEffect } from "react";
import pizza from '../images/pizza.png';
import LocalesCards from './LocalesCards';
import McDonalds from '../images/McDonalds.png';
import KFC from '../images/KFC.png';
import BurgerKing from '../images/BurgerKing.png';
import MapComponent from './MapComponent'; 
import Dunkin from '../images/dunkin.png';
import axios from 'axios'; // Importa Axios
import '../styles/cliente.css';

function HomeCliente() {
  const [negocios, setNegocios] = useState([]);

  const localesDataP = [
    { 
      id_negocio: 'Dunkin\' Donuts',
      name: 'Dunkin\' Donuts',
      image: Dunkin,
      rating: '4.7',
      reviews: '220',
      satisfaction: '99.5',
      menu: ['Donas', 'Sanduches', 'Malteadas'],
      link: '/Restaurante',
    },
    {
      id_negocio: 'KFC-Mall del Río',
      name: 'KFC-Mall del Río',
      image: KFC,
      rating: '4.5',
      reviews: '225',
      satisfaction: '99.9',
      menu: ['Burgers', 'Papas fritas', 'Malteadas'],
      link: '/Restaurante',
    },
    {
      id_negocio: 'BurgerKing',
      name: 'BurgerKing',
      image: BurgerKing,
      rating: '4.5',
      reviews: '225',
      satisfaction: '99.9',
      menu: ['Burgers', 'Papas fritas', 'Malteadas'],
      link: '/Restaurante',
    }
  ];

  const localesData = [
    {
      id_negocio: 'BurgerKing',
      name: 'McDonalds-Remigio',
      image: McDonalds,
      rating: '4.5',
      reviews: '225',
      satisfaction: '99.9',
      menu: ['Burgers', 'Papas fritas', 'Malteadas'],
      link: '/Restaurante',
    },
    {
      id_negocio: 'BurgerKing',
      name: 'KFC-Mall del Río',
      image: KFC,
      rating: '4.5',
      reviews: '225',
      satisfaction: '99.9',
      menu: ['Burgers', 'Papas fritas', 'Malteadas'],
      link: '/Restaurante',
    },
    {
      id_negocio: 'BurgerKing',
      name: 'BurgerKing',
      image: BurgerKing,
      rating: '4.5',
      reviews: '225',
      satisfaction: '99.9',
      menu: ['Burgers', 'Papas fritas', 'Malteadas'],
      link: '/Restaurante',
    }
  ];

  useEffect(() => {
    const obtenerNegocios = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/negocios`);
            setNegocios(response.data.data);
        } catch (error) {
            console.error('Error al obtener negocio:', error);
        }
    };

    obtenerNegocios();
}, []); 
  
  return (
    <div className='ClienteContainer'>
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
        <LocalesCards locales={localesDataP} nombreBoton={'VER OFERTAS'} />
        <h1>Negocios</h1>
        <LocalesCards locales={localesData} nombreBoton={'COMPRAR AHORA'} />
        <h1>¿Buscas lo siempre?</h1>
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
