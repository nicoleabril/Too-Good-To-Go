import React, { useState, useEffect } from "react";
import '../styles/restaurante.css';
import dunkin_logo from '../images/dunkin_donuts_logo.jpeg';
import ProductosCards from './ProductoCards';
import perfilMujer from '../images/perfilMujer.jpg';
import ComentarioCard from './ComentarioCard';
import { addProductoComprado } from './productosComprados';
import axios from 'axios';

const HomeRestaurante = ({ onBuyClick }) => {
  const idNegocio = sessionStorage.getItem("id_negocio");
  const [restauranteData, setRestauranteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productoOfertas, setProductosOfertas] = useState([]);
  const [productosCategoria, setProductosCategoria] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchRestauranteData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/negocios/${idNegocio}`);
        setRestauranteData(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestauranteData();
  }, [idNegocio]);

  useEffect(() => {
    const fetchProductosOfertas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/ofertas/${idNegocio}`);
        setProductosOfertas(response.data.ofertas || []);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setProductosOfertas([]); // No hay ofertas disponibles
        } else {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductosOfertas();
  }, [idNegocio]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Recupera categorías
        const categoriasResponse = await axios.get(`http://localhost:8000/api/categorias/${idNegocio}`);
        const categoriasData = categoriasResponse.data.categorias || [];

        console.log(categoriasData);
  
        // Recupera productos
        const productosResponse = await axios.get(`http://localhost:8000/api/productos/${idNegocio}`);
        const productosData = productosResponse.data.productos || [];

        console.log(productosData);
  
        const categoriasConProductos = categoriasData.map(categoria => {
          const productosFiltrados = productosData.filter(producto => producto.id_categoria === categoria.nombre_categoria);
          return {
            ...categoria,
            productos: productosFiltrados,
          };
        });
  
        const categoriasFiltradas = categoriasConProductos.filter(categoria => 
          categoria.nombre_categoria !== 'Ofertas' && categoria.nombre_categoria !== 'Ofertas2'
        );
  
        setProductosCategoria(categoriasFiltradas);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [idNegocio]);

  const handleBuyClick = (producto) => {
    if (onBuyClick) {
      onBuyClick(producto); 
    }
    addProductoComprado(producto); 
  };



  const hasOfertas = productoOfertas.length > 0;
  const hasProductosCategoria = productosCategoria.length > 0;

  return (
    <div className="RestauranteContainer">
      <div className='textoImagen'>
          <img src={restauranteData.logotipo} alt="Logo del restaurante" className="imagenLogo" />
        <div className='textoRestaurante'>
            <p className='subtexto'>{restauranteData.descripcion}</p>
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
        <img src={restauranteData.imagen_referencial} alt="Imagen referencial" className="imagen2" />
      </div>
      <div className="waves-background2"></div>
      <div className="contenedorRojo"></div>
      <div className="contenedorBlanco">
        {!hasOfertas && !hasProductosCategoria ? (
          <h2>No hay ofertas ni productos disponibles en este momento.</h2>
        ) : (
          <>
            {hasOfertas && (
              <>
                <h1>OFERTAS</h1>
                <div className="linea"></div>
                  <ProductosCards 
                    productos={productoOfertas} 
                    nombreBoton={'COMPRAR AHORA'} 
                    onBuyClick={handleBuyClick} 
                    carruselId={'carrusel-ofertas'}
                  />
              </>
            )}
            {hasProductosCategoria && (
              productosCategoria.map(categoria => (
                categoria.habilitado ? (
                  <div key={categoria.id_categoria}>
                    <h1>{categoria.nombre_categoria}</h1>
                    <ProductosCards 
                      productos={categoria.productos} 
                      nombreBoton={'COMPRAR AHORA'} 
                      onBuyClick={handleBuyClick} 
                      carruselId={`carrusel-${categoria.id_categoria}`} // Identificador único
                    />
                  </div>
                ) : null
              ))
            )}
          </>
        )}
        <ComentarioCard />
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
