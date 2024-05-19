import React, { useState,useEffect } from 'react';
import '../assets/styles/paginadeReserva.css';
import '../assets/components/Reserva/CabeceraDelResumen';
import CabeceraDelResumen from '../assets/components/Reserva/CabeceraDelResumen';
import ResumenDelaReserva from '../assets/components/Reserva/ResumenDelaReserva';
import datosProductosComprados from '../assets/components/Reserva/datosProductosComprados';

function PaginaDeReserva() {
  const [productos, setProductos] = useState(datosProductosComprados.products);
  const [total, setTotal] = useState(0);
  /* Calcula el total de la compra */
  useEffect(() => {
    calcularTotal();
  }, [productos]); /* Se ejecuta cada vez que cambia productos */
  const calcularTotal = () => {
    const nuevoTotal = productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    setTotal(nuevoTotal);
  };

  /* Incrementa la cantidad de un producto */
  const incrementarCantidad = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index].cantidad += 1;
    setProductos(nuevosProductos);
};
/* Decrementa la cantidad de un producto */
const decrementarCantidad = (index) => {
    const nuevosProductos = [...productos];
    if (nuevosProductos[index].cantidad > 0) {
        nuevosProductos[index].cantidad -= 1;
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
        <h2>Detalles de la reserva</h2>
      </div>
    </div>
  );
}
export default PaginaDeReserva;