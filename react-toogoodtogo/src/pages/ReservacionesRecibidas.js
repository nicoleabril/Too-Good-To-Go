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
  const [cliente, setCliente] = useState([]);
  const [productos, setProductos] = useState([]);
  const idNegocio = Cookies.get('id');

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/reservasPendientes/${idNegocio}`);
        const reservas = response.data.reservas;
        if (reservas) {
          const reservasConClientes = await Promise.all(
            reservas.map(async (reserva) => {
              const clienteResponse = await axios.get(`http://localhost:8000/api/clientes/${reserva.id_cliente}`);
              const cliente = clienteResponse.data.data;
              return {
                ...reserva,
                nombreCliente: cliente.nombre // Asegúrate de que 'nombre' es el campo correcto en tu respuesta del cliente
              };
            })
          );

          setReservas(reservasConClientes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerReservas();
  }, [idNegocio]);


  const handleConfirm = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/confirmarReservaEnProceso/${id}`);
      if (response.status === 200) {
        toast.success("Se ha confirmado la Reserva.");
        setReservas(reservas.filter(reserva => reserva.id_reserva !== id));
      } else {
        toast.error("No se ha logrado confirmar la reserva.");
        console.error('Error al confirmar la reserva');
      }
    } catch (error) {
      console.error('Error al confirmar la reserva:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/cancelarReserva/${id}`);
      if (response.status === 200) {
        toast.success("Se ha cancelado la Reserva");
        setReservas(reservas.filter(reserva => reserva.id_reserva !== id));
      } else {
        toast.error("No se ha logrado cancelar la reserva.");
        console.error('Error al cancelar la reserva');
      }
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
    }
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
          {reservas === undefined || reservas.length === 0 ? (
            <h2>No tiene reservas pendientes.</h2>
            ) : (
              reservas.map((reserva) => (
                <Cards_Reservas
                  key={reserva.id_reserva}
                  id={reserva.id_reserva}
                  nombreCliente={reserva.nombreCliente}
                  celular={reserva.telefono}
                  metodoPago={reserva.metodo_pago}
                  pedido={reserva.pedido}
                  horaMinima={reserva.hora_minima}
                  horaMaxima={reserva.hora_maxima}
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              ))
            )}
        </div>
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
