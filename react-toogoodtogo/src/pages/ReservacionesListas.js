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

function ReservacionesListas() {
  const [reservas, setReservas] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [productos, setProductos] = useState([]);
  const idNegocio = Cookies.get('id');

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/reservasListas/${idNegocio}`);
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


  const handleEntregar = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/confirmarReservaEntregado/${id}`);
      const productos  = await axios.get(`http://localhost:8000/api/productos_reservados_reserva/${id}`);
      console.log(productos);
      if (response.status === 200) {
        toast.success("Se ha entregado la Reserva.");
        setReservas(reservas.filter(reserva => reserva.id_reserva !== id));
      } else {
        toast.error("No se ha logrado entregar la reserva.");
        console.error('Error al entregar la reserva');
      }
    } catch (error) {
      console.error('Error al entregar la reserva:', error);
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
                  onEntregado={handleEntregar}
                />
              ))
            )}
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

export default ReservacionesListas;
