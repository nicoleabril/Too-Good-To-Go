import React, { useState, useEffect } from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import Chatbot from '../assets/components/Chatbot';
import Cards_Reservas from '../assets/components/Reserva/Cards_Reservas';
import { getReservasEnCola } from '../assets/components/Reserva/reservaEnCola';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

function ReservacionesRecibidas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const reservasEnCola = getReservasEnCola();
    setReservas(reservasEnCola);
  }, []);

  const handleConfirm = (id) => {
    alert("Se ha enviado un correo al cliente con los detalles de la confirmación de la reserva.");
    setReservas(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
    // Actualiza el localStorage después de eliminar la reserva
    const updatedReservas = reservas.filter(reserva => reserva.id !== id);
    localStorage.setItem('reservasEnCola', JSON.stringify(updatedReservas));
  };

  const handleCancel = (id) => {
    alert("Se ha enviado un correo al cliente con los detalles de la cancelación de la reserva.");
    setReservas(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
    // Actualiza el localStorage después de eliminar la reserva
    const updatedReservas = reservas.filter(reserva => reserva.id !== id);
    localStorage.setItem('reservasEnCola', JSON.stringify(updatedReservas));
  };
  const authToken = Cookies.get('authToken');
  
    // Si la cookie no está presente, redirigir al usuario a la página de login
    if (!authToken) {
        return <Navigate to="/" />;
    }

  return (
    <>
      <div className='cont-principalCardsReserva'>
        <Header page={'Reserva'} />
        <DynamicBreadcrumb />
        <div className='cont-CardsReserva'>
          {reservas.map((reserva) => (
            <Cards_Reservas
              key={reserva.id}
              id={reserva.id}
              nombreCliente={reserva.nombreCliente}
              celular={reserva.celular}
              metodoPago={reserva.metodoPago}
              pedido={reserva.pedido}
              horaReserva={reserva.horaReserva}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          ))}
        </div>
        <footer className="contenedorFooter-ReservasRecibidas">
          <div className="textoFooter2">
            Copyright © 2024 Too Good To Go International. All Rights Reserved.
          </div>
        </footer>
        <Chatbot />
      </div>
    </>
  );
}

export default ReservacionesRecibidas;
