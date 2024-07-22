import React, { useState, useEffect } from 'react';
import '../assets/styles/paginadeReserva.css';
import CabeceraDelResumen from '../assets/components/Reserva/CabeceraDelResumen';
import ResumenDelaReserva from '../assets/components/Reserva/ResumenDelaReserva';
import IngresoDatosPersonales from '../assets/components/Reserva/IngresoDatosPersonales';
import InformacionDeLaReserva from '../assets/components/Reserva/InformacionDeLaReserva';
import { getProductosComprados } from '../assets/components/productosComprados';
import { addReservaEnCola } from '../assets/components/Reserva/reservaEnCola';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';


function PaginaDeReserva() {
  const idNegocio = JSON.parse(sessionStorage.getItem('id_negocio')) || {};
  const [productos, setProductos] = useState([]);
  const [negocio, setNegocio] = useState({});
  const [metodoPago, setMetodoPago] = useState('');

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
  }, [idNegocio]);

  useEffect(() => {
    const productosComprados = getProductosComprados();
    setProductos(productosComprados);
  }, []);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    calcularTotal();
  }, [productos]);

  const calcularTotal = () => {
    const nuevoTotal = productos.reduce((acc, producto) => {
      return acc + (producto.precio * (producto.cantidadVendida));
    }, 0).toFixed(2);
    setTotal(nuevoTotal);
  };

  const handleIncrement = (index) => {
    const newProductos = [...productos];
    newProductos[index].cantidadVendida += 1;
    setProductos(newProductos);
  };

  const handleDecrement = (index) => {
    const newProductos = [...productos];
    if (newProductos[index].cantidadVendida > 0) {
      newProductos[index].cantidadVendida -= 1;
      setProductos(newProductos);
    }
  };

  const handleReservarClick = () => {
    const nuevaReserva = {
      id: '5',
      nombreCliente: 'Camila Granda',
      celular: '0985120236',
      metodoPago: metodoPago === 'pagoEfectivo' ? 'Pago en Efectivo' : metodoPago === 'visa' || metodoPago === 'mastercard' ? 'Tarjeta de Débito' : '',
      pedido: productos.map((producto) => `${producto.cantidadVendida} ${producto.name}`).join(', '),
      horaReserva: '15:00-18:00',
    };
    addReservaEnCola(nuevaReserva);
    alert("Reservación Exitosa, no olvides recoger tu pedido dentro del horario adecuado.");
  };

  const authToken = Cookies.get('authToken');

  // Si la cookie no está presente, redirigir al usuario a la página de login
  if (!authToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className='cont-principalReserva'>
      <header page={'Reserva'} />
      <div className='cont-resumenReserva'>
        <button className="back-button" onClick={() => window.history.back()}>←</button>
        <CabeceraDelResumen nombre_negocio={negocio.nombre_negocio} />
        <ResumenDelaReserva
          productos={productos}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        <p className='totalReserva'>Total: $ {total}</p>
      </div>
      <div className='cont-detallesReserva'>
        <h1 className='texto_CompletaReserva'>Completa tu reserva</h1>
        <IngresoDatosPersonales onPaymentMethodSelect={setMetodoPago} />
        <InformacionDeLaReserva
          metodoPago={metodoPago === 'pagoEfectivo' ? 'Pago en Efectivo' : metodoPago === 'visa' || metodoPago === 'mastercard' || metodoPago === 'paypal' ? 'Tarjeta de Débito' : ''}
          estado={'Pendiente'}
          restaurante={negocio.nombre_negocio}
          horario={negocio.horario_oferta + " - " + negocio.horario_cierre}
        />
        <div className='textoAviso'>
          <p>Haciendo su pedido a través de esta aplicación usted acepta: - Política de Procesamiento de Datos - Acuerdo de licencia de usuario final - Términos del restaurante - Políticas de privacidad</p>
        </div>
        <div className='grupoDeBotones'>
          <a href='/Restaurante'><button id='btnCancelar' className='btnCancelar '>Cancelar</button></a>
          <a href='/Inicio'><button id='btnReservar' className='btnReservar' onClick={handleReservarClick}>Reservar</button></a>
        </div>
      </div>
    </div>
  );
}

export default PaginaDeReserva;
