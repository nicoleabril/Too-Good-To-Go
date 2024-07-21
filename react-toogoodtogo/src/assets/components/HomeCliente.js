import React, { useState, useEffect } from "react";
import pizza from '../images/pizza.png';
import LocalesCards from './LocalesCards';
import McDonalds from '../images/McDonalds.png';
import MapComponent from './MapComponent'; 
import Dunkin from '../images/dunkin.png';
import axios from 'axios';
import '../styles/cliente.css';

function HomeCliente() {
  const [negocios, setNegocios] = useState([]);
  const [negociosOfertas, setNegociosOfertas] = useState([]);
  const [negociosUbicacion, setNegociosUbicacion] = useState([]);

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
    }
  ];

  useEffect(() => {
    const obtenerNegociosOfertas = async () => {
      try {
        const negociosResponse = await axios.get(`http://localhost:8000/api/negocios`);
        const negociosConOfertas = await Promise.all(negociosResponse.data.data.map(async negocio => {
          try {
            const ofertasResponse = await axios.get(`http://localhost:8000/api/ofertas/${negocio.id_negocio}`);
            if (ofertasResponse.data && Array.isArray(ofertasResponse.data.ofertas) && ofertasResponse.data.ofertas.length > 0) {
              const categoriasResponse = await axios.get(`http://localhost:8000/api/categorias/${negocio.id_negocio}`);
              return {
                id_negocio: negocio.id_negocio,
                name: negocio.nombre_negocio,
                image: negocio.logotipo,
                rating: '4.0',
                reviews: '0',
                satisfaction: '100',
                categorias: categoriasResponse.data.categorias || [],
                link: '/Restaurante',
                ofertas: ofertasResponse.data.ofertas,
              };
            } else {
              return null;
            }
          } catch (error) {
            return null;
          }
        }));
  
        // Filtrar negocios que no tienen ofertas
        const negociosConOfertasFiltrados = negociosConOfertas.filter(negocio => negocio !== null);
        setNegociosOfertas(negociosConOfertasFiltrados);
      } catch (error) {
        console.error('Error al obtener negocios con ofertas:', error);
      }
    };
  
    obtenerNegociosOfertas();
  }, []);
  

  useEffect(() => {
    const obtenerNegocios = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/negocios`);
            const negociosConCategorias = await Promise.all(response.data.data.map(async negocio => {
              const categoriasResponse = await axios.get(`http://localhost:8000/api/categorias/${negocio.id_negocio}`);
              return {
                id_negocio: negocio.id_negocio,
                name: negocio.nombre_negocio,
                image: negocio.logotipo,
                rating: '4.0',
                reviews: '0',
                satisfaction: '100',
                categorias: categoriasResponse.data.categorias || [],
                link: '/Restaurante',
              };
            }));
            setNegocios(negociosConCategorias);
        } catch (error) {
            console.error('Error al obtener negocio:', error);
        }
    };

    obtenerNegocios();
  }, []); 

  useEffect(() => {
    const obtenerUbicacion = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/negocios`);
        const negociosConUbicaciones = await Promise.all(response.data.data.map(async ubicacion => {
          return {
            position: [ubicacion.posicion_x, ubicacion.posicion_y],
            name: ubicacion.nombre_negocio
          };
        }));
        setNegociosUbicacion(negociosConUbicaciones);
      } catch (error) {
        console.error('Error al obtener negocio:', error);
      }
    };

    obtenerUbicacion();
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
        <LocalesCards locales={negociosOfertas} nombreBoton={'VER OFERTAS'} carruselId={`carrusel-negocios-ofertas`}/>
        <h1>Negocios</h1>
        <LocalesCards locales={negocios} nombreBoton={'COMPRAR AHORA'} carruselId={`carrusel-negocios`}/>
        <h1>¿Buscas lo siempre?</h1>
        <LocalesCards locales={localesData} nombreBoton={'COMPRAR AHORA'} carruselId={`carrusel-negocios-frecuentes`}/>
        <h1>Localización</h1>
        <MapComponent locations={negociosUbicacion}/>
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
