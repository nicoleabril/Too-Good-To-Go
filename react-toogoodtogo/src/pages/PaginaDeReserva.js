import React, { useState, useEffect } from 'react';
import '../assets/styles/paginadeReserva.css';
import '../assets/components/Reserva/CabeceraDelResumen';
import CabeceraDelResumen from '../assets/components/Reserva/CabeceraDelResumen';
import ResumenDelaReserva from '../assets/components/Reserva/ResumenDelaReserva';
import datosProductosComprados from '../assets/components/Reserva/datosProductosComprados';
import IngresoDatosPersonales from '../assets/components/Reserva/IngresoDatosPersonales';
import InformacionDeLaReserva from '../assets/components/Reserva/InformacionDeLaReserva';
import { getProductosComprados } from '../assets/components/productosComprados';


const dataInformacionReserva = [
  {
    metodoPago: 'Tarjeta de Crédito',
    estado: 'Pendiente',
    restaurante: 'Restaurante de Prueba',
    direccion: 'Calle de Prueba',
    horario: '12:00 - 14:00'
  }

];

/* EN TEORÍA AQUÍ SE PASAN TODOS LOS DATOS DEL RESTAURANTE */
function PaginaDeReserva() {
  const [productos, setProductos] = useState(getProductosComprados);
  const [total, setTotal] = useState(0);
  /* Calcula el total de la compra */
  useEffect(() => {
    calcularTotal();
  }, [productos]); /* Se ejecuta cada vez que cambia productos */
  const calcularTotal = () => {
    //redondear a 2 decimales
    const nuevoTotal = productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidadVendida), 0).toFixed(2);
    
    setTotal(nuevoTotal);
  };

  /* Incrementa la cantidad de un producto */
  const incrementarCantidad = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index].cantidadVendida += 1;
    setProductos(nuevosProductos);
  };
  /* Decrementa la cantidad de un producto */
  const decrementarCantidad = (index) => {
    const nuevosProductos = [...productos];
    if (nuevosProductos[index].cantidadVendida > 0) {
      nuevosProductos[index].cantidadVendida -= 1;
      setProductos(nuevosProductos);
    }
  };

  const handleReservarClick = () => {
    alert("Reservación Exitosa, no olvides recoger tu pedido dentro del horario adecuado.");
  };

  return (
    <div className='cont-principalReserva' >
      <header page={'Reserva'} />
      <div className='cont-resumenReserva'>
      <button className="back-button" onClick={() => window.history.back()}>←</button>
        <CabeceraDelResumen />
        <ResumenDelaReserva
          productos={productos}
          onIncrement={incrementarCantidad}
          onDecrement={decrementarCantidad}
        />
        <p className='totalReserva'>Total: $ {total}</p>
      </div>
      <div className='cont-detallesReserva'>
        <h1 className='texto_CompletaReserva'>Completa tu reserva</h1>
        
        <IngresoDatosPersonales />
        <InformacionDeLaReserva metodoPago={dataInformacionReserva[0].metodoPago} estado={dataInformacionReserva[0].estado} restaurante={dataInformacionReserva[0].restaurante} direccion={dataInformacionReserva[0].direccion} horario={dataInformacionReserva[0].horario} />
        <div className='textoAviso'>
        <p >Haciendo su pedido a través de esta aplicación usted acepta: - Política de Procesamiento de Datos - Acuerdo de licencia de usuario final - Términos del restaurante - Políticas de privacidad</p>
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