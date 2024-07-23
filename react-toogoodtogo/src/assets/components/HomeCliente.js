import React, { useState, useEffect } from "react";
import pizza from '../images/pizza.png';
import LocalesCards from './LocalesCards';
import axios from 'axios';
import MapComponent from './MapComponent'; 
import '../styles/cliente.css';

function HomeCliente() {
  const [negocios, setNegocios] = useState([]);
  const [negociosOfertas, setNegociosOfertas] = useState([]);
  const [negociosUbicacion, setNegociosUbicacion] = useState([]);
  const [coordenadas, setCoordenadas] = useState({ latitud: null, longitud: null });

  useEffect(() => {
    const obtenerCoordenadas = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordenadas({
              latitud: position.coords.latitude,
              longitud: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error al obtener las coordenadas: ", error);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        console.error("La geolocalización no es compatible con este navegador.");
      }
    };

    obtenerCoordenadas();
  }, []);

  useEffect(() => {
    const obtenerNegocios = async () => {
      try {
        // Función para obtener negocios
        const fetchNegocios = async () => {
          const response = await axios.get(`http://localhost:8000/api/negocios`);
          return response.data.data;
        };

        // Función para obtener ofertas de un negocio
        const fetchOfertas = async (idNegocio) => {
          const response = await axios.get(`http://localhost:8000/api/ofertas/${idNegocio}`);
          return response.data.ofertas;
        };

        // Función para obtener categorías de un negocio
        const fetchCategorias = async (idNegocio) => {
          const response = await axios.get(`http://localhost:8000/api/categorias/${idNegocio}`);
          return response.data.categorias || [];
        };

        // Función para obtener comentarios de un negocio
        const fetchComentarios = async (idNegocio) => {
          const response = await axios.get(`http://localhost:8000/api/comentariosNegocios/${idNegocio}`);
          return response.data.comentarios.length;
        };

        // Función para obtener ubicaciones de negocios
        const fetchUbicaciones = (negocios) => {
          return negocios.map(ubicacion => ({
            position: [ubicacion.posicion_x, ubicacion.posicion_y],
            name: ubicacion.nombre_negocio
          }));
        };

        const negocios = await fetchNegocios();

        // Recupera ofertas, categorías y comentarios para cada negocio
        const negociosConOfertas = await Promise.all(negocios.map(async negocio => {
          try {
            const ofertas = await fetchOfertas(negocio.id_negocio);

            if (Array.isArray(ofertas) && ofertas.length > 0) {
              const categorias = await fetchCategorias(negocio.id_negocio);
              const commentsCount = await fetchComentarios(negocio.id_negocio);

              return {
                id_negocio: negocio.id_negocio,
                name: negocio.nombre_negocio,
                image: negocio.logotipo,
                rating: '4.0',  // Puedes reemplazar con datos reales si están disponibles
                reviews: commentsCount,
                satisfaction: '100',  // Puedes reemplazar con datos reales si están disponibles
                categorias: categorias,
                link: '/Restaurante',
                ofertas: ofertas,
              };
            } else {
              return null; // No hay ofertas, no incluimos este negocio
            }
          } catch (error) {
            console.error(`Error al obtener datos del negocio ${negocio.id_negocio}:`, error);
            return null;
          }
        }));

        const negociosConOfertasFiltrados = negociosConOfertas.filter(negocio => negocio !== null);
        setNegociosOfertas(negociosConOfertasFiltrados);

        // Recupera ubicaciones de negocios
        const ubicaciones = fetchUbicaciones(negocios);
        setNegociosUbicacion(ubicaciones);

        // También puedes almacenar los negocios generales
        const negociosConCategorias = await Promise.all(negocios.map(async negocio => {
          const categorias = await fetchCategorias(negocio.id_negocio);
          const commentsCount = await fetchComentarios(negocio.id_negocio);

          return {
            id_negocio: negocio.id_negocio,
            name: negocio.nombre_negocio,
            image: negocio.logotipo,
            rating: '4.0',
            reviews: commentsCount,
            satisfaction: '100',
            categorias: categorias,
            link: '/Restaurante',
          };
        }));
        setNegocios(negociosConCategorias);
      } catch (error) {
        console.log(error);
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
        <LocalesCards locales={negociosOfertas} nombreBoton={'VER OFERTAS'} carruselId={`carrusel-negocios-ofertas`}/>
        <h1>Negocios</h1>
        <LocalesCards locales={negocios} nombreBoton={'COMPRAR AHORA'} carruselId={`carrusel-negocios`}/>
        <h1>¿Buscas lo siempre?</h1>
        <LocalesCards locales={negocios} nombreBoton={'COMPRAR AHORA'} carruselId={`carrusel-negocios-frecuentes`}/>
        <h1>Localización</h1>
        <MapComponent locations={negociosUbicacion} user={coordenadas}/>
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
