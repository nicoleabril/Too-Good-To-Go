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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const obtenerNegociosOfertas = async () => {
      try {
        // Recupera todos los negocios
        const negociosResponse = await axios.get(`http://localhost:8000/api/negocios`);
        const negocios = negociosResponse.data.data;

        // Recupera ofertas, categorías y comentarios para cada negocio
        const negociosConOfertas = await Promise.all(negocios.map(async negocio => {
          try {
            // Recupera ofertas del negocio
            const ofertasResponse = await axios.get(`http://localhost:8000/api/ofertas/${negocio.id_negocio}`);
            
            // Verifica si hay ofertas disponibles
            if (Array.isArray(ofertasResponse.data.ofertas) && ofertasResponse.data.ofertas.length > 0) {
              // Recupera categorías del negocio
              const categoriasResponse = await axios.get(`http://localhost:8000/api/categorias/${negocio.id_negocio}`);
              
              // Recupera comentarios del negocio
              const responseComentarios = await axios.get(`http://localhost:8000/api/comentariosNegocios/${negocio.id_negocio}`);
              const commentsCount = responseComentarios.data.comentarios.length;

              // Devuelve la información del negocio con ofertas
              return {
                id_negocio: negocio.id_negocio,
                name: negocio.nombre_negocio,
                image: negocio.logotipo,
                rating: '4.0',  // Puedes reemplazar con datos reales si están disponibles
                reviews: commentsCount,
                satisfaction: '100',  // Puedes reemplazar con datos reales si están disponibles
                categorias: categoriasResponse.data.categorias || [],
                link: '/Restaurante',
                ofertas: ofertasResponse.data.ofertas,
              };
            } else {
              return null; // No hay ofertas, no incluimos este negocio
            }
          } catch (error) {
            console.error(`Error al obtener datos del negocio ${negocio.id_negocio}:`, error);
            return null;
          }
        }));

        // Filtra los negocios que tienen ofertas
        const negociosConOfertasFiltrados = negociosConOfertas.filter(negocio => negocio !== null);

        // Actualiza el estado con los negocios que tienen ofertas
        setNegociosOfertas(negociosConOfertasFiltrados);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
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
              const responseComentarios = await axios.get(`http://localhost:8000/api/comentariosNegocios/${negocio.id_negocio}`);
              let comments =0;
              if(responseComentarios.data.comentarios.length>0){
                comments=responseComentarios.data.comentarios.length;
              }
              return {
                id_negocio: negocio.id_negocio,
                name: negocio.nombre_negocio,
                image: negocio.logotipo,
                rating: '4.0',
                reviews: comments,
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
        <LocalesCards locales={negocios} nombreBoton={'COMPRAR AHORA'} carruselId={`carrusel-negocios-frecuentes`}/>
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
