import React from 'react';
import '../assets/styles/paginadeReserva.css';
import '../assets/components/Reserva/CabeceraDelResumen';
import CabeceraDelResumen from '../assets/components/Reserva/CabeceraDelResumen';
import ResumenDelaReserva from '../assets/components/Reserva/ResumenDelaReserva';

function PaginaDeReserva() {
  return (
    <div className='cont-principalReserva' >
      
      <div className='cont-resumenReserva'>
      <CabeceraDelResumen />
      <ResumenDelaReserva />
      </div>

      <div className='cont-detallesReserva'>
        <h2>Detalles de la reserva</h2>
      </div>
    </div>
  );
}
export default PaginaDeReserva;