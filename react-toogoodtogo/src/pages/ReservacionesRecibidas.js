import React, { useState, useEffect } from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import Chatbot from '../assets/components/Chatbot';
import Cards_Reservas from '../assets/components/Reserva/Cards_Reservas';
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';

function ReservacionesRecibidas() {
  const idNegocio = Cookies.get('id');
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/reservasPendientes/${idNegocio}`);
        setReservas(response.data.reservas);
      } catch (error) {
        console.error('Error al obtener reservas:', error);
      }
    };
    obtenerReservas();
  }, [idNegocio]);

  const handleConfirm = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/confirmarReservaEnProceso/${id}`);
      if (response.status === 200) {
        toast.success('Reserva confirmada');
        setReservas(prevReservas => prevReservas.filter(reserva => reserva.id_reserva !== id));
      }
    } catch (error) {
      console.error('Error al confirmar reserva:', error);
      toast.error('Error al confirmar la reserva');
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/cancelarReserva/${id}`);
      if (response.status === 200) {
        toast.error('Reserva cancelada');
        setReservas(prevReservas => prevReservas.filter(reserva => reserva.id_reserva !== id));
      }
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
      toast.error('Error al cancelar la reserva');
    }

  };

  const authToken = Cookies.get('authToken');
  
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
              key={reserva.id_reserva}
              id={reserva.id_reserva}
              nombreCliente={reserva.nombres + " " + reserva.apellidos}
              celular={reserva.telefono}
              metodoPago={reserva.metodo_pago}
              pedido={reserva.pedido}
              horaReserva={reserva.hora_minima + " - " + reserva.hora_maxima}
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
        <ToastContainer
          closeButtonStyle={{
            fontSize: '10px', // Tamaño de fuente del botón de cerrar
            padding: '4px'    // Espaciado interno del botón de cerrar
          }}
          style={{ width: '400px' }} // Ancho deseado para ToastContainer
        />
      </div>
    </>
  );
}

export default ReservacionesRecibidas;
