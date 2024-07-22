import React, { useState, useEffect } from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import Chatbot from '../assets/components/Chatbot';
import Cards_Reservas from '../assets/components/Reserva/Cards_Reservas';
import { getReservasEnCola } from '../assets/components/Reserva/reservaEnCola';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';

function ReservacionesRecibidas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const reservasEnCola = getReservasEnCola();
    setReservas(reservasEnCola);
  }, []);

  const handleConfirm = (id) => {
    toast.success("Se ha enviado un correo al cliente con los detalles de la confirmación de la reserva.");
    setReservas(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
    const updatedReservas = reservas.filter(reserva => reserva.id !== id);
  };

  const handleCancel = (id) => {
    toast.error("Se ha enviado un correo al cliente con los detalles de la cancelación de la reserva.");
    setReservas(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
    const updatedReservas = reservas.filter(reserva => reserva.id !== id);
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
      <ToastContainer
            closeButtonStyle={{
                fontSize: '10px', // Tamaño de fuente del botón de cerrar
                padding: '4px'    // Espaciado interno del botón de cerrar
            }}
            style={{ width: '400px' }} // Ancho deseado para ToastContainer
            />
    </>
  );
}

export default ReservacionesRecibidas;
