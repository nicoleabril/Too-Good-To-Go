import React, { useState, useEffect } from "react";
import '../styles/restaurante.css';
import dunkin_logo from '../images/dunkin_donuts_logo.jpeg';
import ProductosCards from './ProductoCards';
import perfilMujer from '../images/perfilMujer.jpg';
import ComentarioCard from './ComentarioCard';
import { addProductoComprado } from './productosComprados';
import axios from 'axios';
import user from '../images/user.png';

const HomeRestaurante = ({ onBuyClick }) => {
  const idNegocio = sessionStorage.getItem("id_negocio");
  const [restauranteData, setRestauranteData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productoOfertas, setProductosOfertas] = useState([]);
  const [productosCategoria, setProductosCategoria] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [clienteComentario, setClienteComentario] = useState({});
  const [ultimoComentario, setUltimoComentario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Obtener datos del restaurante
        const responseRestaurante = await axios.get(`http://localhost:8000/api/negocios/${idNegocio}`);
        setRestauranteData(responseRestaurante.data.data || {});
        
        // Obtener comentarios
        const responseComentarios = await axios.get(`http://localhost:8000/api/comentariosNegocios/${idNegocio}`);
        const comentariosData = responseComentarios.data.comentarios || [];
        setComentarios(comentariosData);

        if (comentariosData.length > 0) {
          const ultimoComentario = comentariosData[comentariosData.length - 1];
          const responseCliente = await axios.get(`http://localhost:8000/api/clientes/${ultimoComentario.id_cliente}`);
          setClienteComentario(responseCliente.data.data || {});
          setUltimoComentario(ultimoComentario);
        }

        // Obtener ofertas
        const responseOfertas = await axios.get(`http://localhost:8000/api/ofertas/${idNegocio}`);
        setProductosOfertas(responseOfertas.data.ofertas || []);

        // Obtener categorías y productos
        const responseCategorias = await axios.get(`http://localhost:8000/api/categorias/${idNegocio}`);
        const categoriasData = responseCategorias.data.categorias || [];
        const responseProductos = await axios.get(`http://localhost:8000/api/productos/${idNegocio}`);
        const productosData = responseProductos.data.productos || [];

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
      onBuyClick(producto.id_oferta || producto.id_producto); 
    }
    addProductoComprado(producto, 'comprarMas');
  };

  const hasOfertas = productoOfertas.length > 0;
  const hasProductosCategoria = productosCategoria.length > 0;
  const tieneComentarios = comentarios.length > 0;
  const ultimoComentarioDescripcion = ultimoComentario?.descripcion || '';

  return (
    <div className="RestauranteContainer">
      <div className='textoImagen'>
        <img src={restauranteData.logotipo} alt="Logo del restaurante" className="imagenLogo" />
        <div className='textoRestaurante'>
          <p className='subtexto'>{restauranteData.descripcion}</p>
        </div>
        {tieneComentarios && (
          <div className="comentario">
            <div className="cliente">
              <div className='fotoCliente'>
                <img 
                  src={clienteComentario.foto_perfil || user} 
                  alt="Foto del cliente"
                />
              </div>
              <div className='textoComentario'>
                <h3>{clienteComentario.nombre || 'Cliente'}</h3>
                ⭐⭐⭐⭐⭐
                <div className="contenido">
                  <p>{ultimoComentarioDescripcion}</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
