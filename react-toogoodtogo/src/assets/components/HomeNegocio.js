import React, { useState, useEffect } from 'react';
import '../styles/restaurante.css'
import donas from '../images/donas.png'
import dunkin_logo from '../images/dunkin_donuts_logo.jpeg'
import DashboardCards from './DashboardCard';
import StatisticsCards from './StatisticsCard';
import GraficaCard from './GraficaCard';
import bebida3 from '../images/bebida3.jpeg'
import sanduche1 from '../images/sanduche1.jpeg'
import sanduche3 from '../images/sanduche3.jpeg'
import PopularCard from './PopularCard';
import user from '../images/user.png'
import { GrGroup } from "react-icons/gr";
import { IoReceipt } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
function HomeNegocio() {
  const idNegocio = Cookies.get('id');
  const [negocio, setNegocio] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [clienteComentario, setClienteComentario] = useState([]);
  const [datosEstadisticos, setDatosEstadisticos] = useState([]);
  const [ultimoComentario, setUltimoComentario] = useState([]);
  const [ordenesPopulares, setOrdenesPopulares] = useState([]);
  const [masVendidos, setMasVendidos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Recupera productos
        const productosResponse = await axios.get(`http://localhost:8000/api/productos/${idNegocio}`);
        const productosData = productosResponse.data.productos || [];
        setOrdenesPopulares(productosData);
  
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData2 = async () => {
      try {
        // Recupera productos
        const productosResponse = await axios.get(`http://localhost:8000/api/comentariosNegocios/${idNegocio}`);
        const productosData = productosResponse.data.comentarios || [];
        setComentarios(productosData);
        // Obtener el último comentario registrado
        if (productosData.length > 0) {
          const ultimoComentario = productosData[productosData.length - 1];
          const productosResponse = await axios.get(`http://localhost:8000/api/clientes/${ultimoComentario.id_cliente}`);
          const cliente = productosResponse.data.data || [];
          setClienteComentario(cliente);
          setUltimoComentario(ultimoComentario);
        } else {
          setUltimoComentario(null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const obtenerNegocio = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/negocios/${idNegocio}`);
        setNegocio(response.data.data);
      } catch (error) {
        console.error('Error al obtener negocio:', error);
      }
    };

    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/producto-normal-mas-vendido/${idNegocio}`);
        const producto = response.data;
        const response2 = await axios.get(`http://localhost:8000/api/producto-oferta-mas-vendida/${idNegocio}`);
        const oferta = response2.data;
        const adaptadoProductoNormal = {
          image: producto.imagen || 'default_image_url',
          name: producto.nombre_producto || 'Nombre del Producto Normal',
          descript: producto.descripcion || 'Descripción del Producto Normal',
          sales: producto.total || 0
        };
    
        const adaptadoProductoOferta = {
          image: oferta.imagen_oferta || 'default_image_url',
          name: oferta.nombre_oferta || 'Nombre del Producto Oferta',
          descript: oferta.descripcion || 'Descripción del Producto Oferta',
          sales: oferta.total || 0
        };
    
        // Une los productos en un array
        const platos = [adaptadoProductoNormal, adaptadoProductoOferta];
        setMasVendidos(platos);
      } catch (error) {
        console.error('Error al obtener negocio:', error);
      }
    };

    const obtenerEstadisticas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/total-clientes/${idNegocio}`);
        const totalClientes = response.data;
        const response2 = await axios.get(`http://localhost:8000/api/compras-ordenadas/${idNegocio}`);
        const totalCompras = response2.data;
        const response3 = await axios.get(`http://localhost:8000/api/total-ganado/${idNegocio}`);
        const totalGanado = response3.data;

        const totalClienteAdaptado = {
          name: 'Nuevos Clientes',
          number: totalClientes,
          icon: <GrGroup size={30}/>,
        };
    
        const totalComprasAdaptado = {
          name: 'Total Ordenado',
          number: totalCompras,
          icon: <IoReceipt size={30}/>,
        };

        const totalGanadoAdaptado = {
          name: 'Total Ingreso',
          number: `$${totalGanado}`,
          icon: <FaMoneyBillWave size={30}/>,
        };
    
        // Une los productos en un array
        const platos = [totalClienteAdaptado, totalComprasAdaptado, totalGanadoAdaptado];
        setDatosEstadisticos(platos);
      } catch (error) {
        console.error('Error al obtener negocio:', error);
      }
    };
  
    fetchData();
    fetchData2();
    obtenerNegocio();
    obtenerProducto();
    obtenerEstadisticas();
  }, [idNegocio]);

  const hasOfertas = ordenesPopulares.length > 0;
  const tieneComentarios = comentarios.length > 0;

    return (
    
        <div className="RestauranteContainer">
            <div className='textoImagen'>
              <img src={negocio.logotipo} alt="Logotipo" className="imagenLogo"/>
              <div className='textoRestaurante'>
                <p className='subtexto'>{negocio.descripcion}</p>
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
                      <h3>{clienteComentario.nombre}</h3>
                      ⭐⭐⭐⭐⭐
                      <div className="contenido">
                        <p>{ultimoComentario.descripcion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="imagenPizza">
              <img src={negocio.imagen_referencial} alt="Imagen Referencial" className="imagen2" />
            </div>
            <div className="waves-background2"></div>
            <div className="contenedorRojo">
            </div>
            <div className="contenedorBlanco">
              <h1>ÓRDENES POPULARES</h1>
              <div className="linea"></div>
              {!hasOfertas ? (
                <h2>No hay ofertas ni productos disponibles en este momento.</h2>
              ) : (
                <PopularCard productos={ordenesPopulares} nombreBoton={'EDITAR AHORA'} carruselId={'carrusel-populares'}/> 
              )}
              
              <div className='componentesDashboard'>
                  <DashboardCards platos={masVendidos} /> 
                  <StatisticsCards datos={datosEstadisticos} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} /> 
                  {selectedIndex !== null && <GraficaCard selectedIndex={selectedIndex} />}
              </div>
              <div className="linea"></div>
            </div>
            <div className="contenedorFooter">
              <div className="textoFooter2">
                Copyright © 2024 Too Good To Go International. All Rights Reserved.
              </div>
            </div>
        </div>

    
    );
    
    
  }
  
  export default HomeNegocio;