import React, { useState, useEffect } from 'react';
import '../assets/styles/paginadeReserva.css';
import CabeceraDelResumen from '../assets/components/Reserva/CabeceraDelResumen';
import ResumenDelaReserva from '../assets/components/Reserva/ResumenDelaReserva';
import IngresoDatosPersonales from '../assets/components/Reserva/IngresoDatosPersonales';
import InformacionDeLaReserva from '../assets/components/Reserva/InformacionDeLaReserva';
import { getProductosComprados } from '../assets/components/productosComprados';
import { addReservaEnCola } from '../assets/components/Reserva/reservaEnCola';
const dataInformacionReserva = [
  {
    metodoPago: 'Tarjeta de Crédito',
    estado: 'Pendiente',
    restaurante: 'Restaurante de Prueba',
    direccion: 'Calle de Prueba',
    horario: '12:00 - 14:00'
  }
];

function PaginaDeReserva() {
  const [productos, setProductos] = useState([]);

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
      return acc + (producto.precio * (producto.cantidadVendida || 1));
    }, 0).toFixed(2);
    setTotal(nuevoTotal);
  };

  const handleReservarClick = () => {
    const nuevaReserva = {
      id: '5',
      nombreCliente: 'Camila Granda',
      celular: '0985120236',
      metodoPago: dataInformacionReserva[0].metodoPago,
      pedido: productos.map((producto) => `${producto.cantidadVendida} ${producto.name}`).join(', '), 
      horaReserva: '15:00-18:00',
    };
    addReservaEnCola(nuevaReserva);
    alert("Reservación Exitosa, no olvides recoger tu pedido dentro del horario adecuado.");
  };

  return (
    <div className='cont-principalReserva'>
      <header page={'Reserva'} />
      <div className='cont-resumenReserva'>
        <button className="back-button" onClick={() => window.history.back()}>←</button>
        <CabeceraDelResumen />
        <ResumenDelaReserva productos={productos} setProductos={setProductos} />
        <p className='totalReserva'>Total: $ {total}</p>
      </div>
      <div className='cont-detallesReserva'>
        <h1 className='texto_CompletaReserva'>Completa tu reserva</h1>
        <IngresoDatosPersonales />
        <InformacionDeLaReserva
          metodoPago={dataInformacionReserva[0].metodoPago}
          estado={dataInformacionReserva[0].estado}
          restaurante={dataInformacionReserva[0].restaurante}
          direccion={dataInformacionReserva[0].direccion}
          horario={dataInformacionReserva[0].horario}
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
