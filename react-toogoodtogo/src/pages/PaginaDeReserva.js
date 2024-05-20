import React, { useState,useEffect } from 'react';
import '../assets/styles/paginadeReserva.css';
import '../assets/components/Reserva/CabeceraDelResumen';
import CabeceraDelResumen from '../assets/components/Reserva/CabeceraDelResumen';
import ResumenDelaReserva from '../assets/components/Reserva/ResumenDelaReserva';
import datosProductosComprados from '../assets/components/Reserva/datosProductosComprados';
import IngresoDatosPersonales from '../assets/components/Reserva/IngresoDatosPersonales';
import InformacionDeLaReserva from '../assets/components/Reserva/InformacionDeLaReserva';

/* EN TEORÍA AQUÍ SE PASAN TODOS LOS DATOS DEL RESTAURANTE */
function PaginaDeReserva() {
  const [productos, setProductos] = useState(datosProductosComprados.products);
  const [total, setTotal] = useState(0);
  /* Calcula el total de la compra */
  useEffect(() => {
    calcularTotal();
  }, [productos]); /* Se ejecuta cada vez que cambia productos */
  const calcularTotal = () => {
    const nuevoTotal = productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidadVendida), 0);
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

  return (
    <div className='cont-principalReserva' >

      <div className='cont-resumenReserva'>
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
        <InformacionDeLaReserva />  
      </div>

    </div>
  );
}
export default PaginaDeReserva;