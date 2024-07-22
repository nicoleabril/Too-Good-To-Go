import React, { useState, useEffect } from 'react';
import '../assets/styles/paginadeReserva.css';
import CabeceraDelResumen from '../assets/components/Reserva/CabeceraDelResumen';
import ResumenDelaReserva from '../assets/components/Reserva/ResumenDelaReserva';
import IngresoDatosPersonales from '../assets/components/Reserva/IngresoDatosPersonales';
import InformacionDeLaReserva from '../assets/components/Reserva/InformacionDeLaReserva';
import { getProductosComprados } from '../assets/components/productosComprados';
import { addReservaEnCola } from '../assets/components/Reserva/reservaEnCola';
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function PaginaDeReserva() {
  const idNegocio = JSON.parse(sessionStorage.getItem('id_negocio')) || {};
  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [negocio, setNegocio] = useState({});
  const [metodoPago, setMetodoPago] = useState('');
  const [total, setTotal] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    nombreTitular: '',
    numeroTarjeta: '',
    codigoSeguridad: '',
    fechaExpiracion: ''
  });

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

    const initialCantidades = {};
    productosComprados.forEach(producto => {
      initialCantidades[producto.id_oferta || producto.id_producto] = 1;
    });
    setCantidades(initialCantidades);
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [productos, cantidades]);

  const calcularTotal = () => {
    const nuevoTotal = productos.reduce((acc, producto) => {
      const cantidad = cantidades[producto.id_oferta || producto.id_producto] || 1;
      return acc + (producto.precio * cantidad);
    }, 0).toFixed(2);
    setTotal(nuevoTotal);
  };

  const handleIncrement = (id) => {
    setCantidades(prevCantidades => ({
      ...prevCantidades,
      [id]: (prevCantidades[id] || 1) + 1
    }));
  };

  const handleDecrement = (id) => {
    setCantidades(prevCantidades => ({
      ...prevCantidades,
      [id]: prevCantidades[id] > 1 ? prevCantidades[id] - 1 : 1
    }));
  };

  const validateForm = () => {
    const requiredFields = ['nombres', 'apellidos', 'correo', 'telefono'];
    for (let field of requiredFields) {
      console.log('datos recuperados: ', personalInfo);
      if (!personalInfo[field]) {
        toast.error(`Llene todos los campos obligatorios de información personal.`);
        return false;
      }
    }

    if (metodoPago === 'visa' || metodoPago === 'mastercard' || metodoPago === 'paypal') {
      const paymentFields = ['nombreTitular', 'numeroTarjeta', 'codigoSeguridad', 'fechaExpiracion'];
      for (let field of paymentFields) {
        if (!personalInfo[field]) {
          toast.error(`Llene todos los campos obligatorios de información de pago.`);
          return false;
        }
      }
    }

    if (!metodoPago) {
      toast.error('Debe seleccionar un método de pago.');
      return false;
    }

    return true;
  };

  const handlePersonalInfoSubmit = (info) => {
    setPersonalInfo(info);
  };

  const handleReservarClick = async () => {
    if (!validateForm()) {
      return;
    }
  
    const nuevaReserva = {
      id_negocio: idNegocio,
      id_cliente: Cookies.get('id'),
      metodo_pago: metodoPago,
      fecha: new Date().toISOString(),
      hora_minima: negocio.horario_oferta,
      hora_maxima: negocio.horario_cierre,
      estado: 'Pendiente',
    };
    try {
      const response = await axios.post('http://localhost:8000/api/reservas', nuevaReserva, {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });
  
      if (response.status === 201) {
        toast.success('Reserva guardada correctamente');
        //Como ya se creo la reserva se va la venta
        window.history.back();
      } else {
        toast.error('Error al guardar la reserva.');
      
      }
    } catch (error) {
      toast.error('Error al guardar la reserva.');
      console.error('Error:', error);
    }
  };

  const handleFactura= async (idReserva) => {

    const nuevaFactura = {
      
    };

    try {

    } catch (error) {
      console.error('Error al obtener factura:', error);
    }

  }
  const authToken = Cookies.get('authToken');

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
          cantidades={cantidades}
        />
        <p className='totalReserva'>Total: $ {total}</p>
      </div>
      <div className='cont-detallesReserva'>
        <h1 className='texto_CompletaReserva'>Completa tu reserva</h1>
        <IngresoDatosPersonales 
          onPaymentMethodSelect={setMetodoPago} 
          onPersonalInfoSubmit={handlePersonalInfoSubmit} 
        />
        <InformacionDeLaReserva
          metodoPago={metodoPago === 'pagoEfectivo' ? 'Pago en Efectivo' : metodoPago ? 'Tarjeta de Débito' : ''}
          estado={'Pendiente'}
          restaurante={negocio.nombre_negocio}
          horario={negocio.horario_oferta + " - " + negocio.horario_cierre}
        />
        <div className='textoAviso'>
          <p>Haciendo su pedido a través de esta aplicación usted acepta: - Política de Procesamiento de Datos - Acuerdo de licencia de usuario final - Términos del restaurante - Políticas de privacidad</p>
        </div>
        <div className='grupoDeBotones'>
          <button id='btnCancelar' className='btnCancelar '>Cancelar</button>
          <button id='btnReservar' className='btnReservar' onClick={handleReservarClick}>Reservar</button>
        </div>
      </div>
      <ToastContainer
        closeButtonStyle={{
            fontSize: '10px',
            padding: '4px'
        }}
        style={{ width: '400px' }}
      />
    </div>
  );
}

export default PaginaDeReserva;
