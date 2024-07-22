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
  const [ultimoComentario, setUltimoComentario] = useState([]);
  const [ordenesPopulares, setOrdenesPopulares] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);


  const masVendidos = [
    {
      sales: '| 240 ventas',
      name: 'Chocolate Frío',
      descript: '4.5⭐',
      image: bebida3,
    },
    {
        sales: '| 100 ventas',
        name: 'Cubanitos',
        descript: '3.9⭐ ',
        image: sanduche1,
    },
  ];

  const datosEstadisticos = [
    {
      name: 'Nuevos Clientes',
      number: '24',
      icon: <GrGroup size={30}/>,
    },
    {
        name: 'Total Ordenado',
        number: '156',
        icon: <IoReceipt size={30}/>,
    },
    {
      name: 'Total Ingreso',
      number: '$ 1500',
      icon: <FaMoneyBillWave size={30}/>,
  },
  ];

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
  
    fetchData();
  }, [idNegocio]);

  useEffect(() => {
    const fetchData = async () => {
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
          console.log(cliente);
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
  
    fetchData();
  }, [idNegocio]);
  

  useEffect(() => {
    const obtenerNegocio = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/negocios/${idNegocio}`);
        setNegocio(response.data.data);
      } catch (error) {
        console.error('Error al obtener negocio:', error);
      }
    };
  
    obtenerNegocio();
  }, []); // Agregar idNegocio como dependencia si deseas que el efecto se ejecute al cambiar idNegocio

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
                      src={ultimoComentario.foto_perfil || user} 
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