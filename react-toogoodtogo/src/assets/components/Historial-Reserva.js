import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import '../styles/comments.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const Historial = () => {
  const idCliente = Cookies.get('id');
  const [reservas, setReservas] = useState([]);
  const [nombresNegocios, setNombresNegocios] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const estadoClase = {
    Cancelado: 'btn-cancelado',
    'En Proceso': 'btn-proceso',
    Finalizado: 'btn-finalizado',
    Realizado: 'btn-realizado',
    Pendiente: 'btn-pendiente'
  };

  const estadoTexto = {
    Cancelado: 'Cancelado',
    'En Proceso': "En Proceso",
    Finalizado: 'Finalizado',
    Realizado: 'Realizado',
    Pendiente: 'Pendiente'
  };

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/reservas/${idCliente}`);
        const reservas = response.data.reservas;
        setReservas(reservas);
        const nombres = {};
        const promesas = reservas.map(reserva =>
          axios.get(`http://localhost:8000/api/negocios/${reserva.id_negocio}`)
            .then(response => {
              nombres[reserva.id_negocio] = response.data.data.nombre_negocio;
            })
        );

        await Promise.all(promesas);
        setNombresNegocios(nombres);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener reservas:', error);
        setError(error);
        setLoading(false);
      }
    };

    obtenerReservas();
  }, [idCliente]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar las reservas: {error.message}</div>;
  }
  console.log(reservas);
  return (
    <div className="container-comments">
      <div className="comments-list">
        {reservas.length === 0 ? (
          <div>No hay reservas.</div>
        ) : (
          reservas.map(comment => (
            <Card key={comment.id_reserva} className={`mb-3 ${estadoClase[comment.estado] || ''}`}>
              <Card.Header>{nombresNegocios[comment.id_negocio]}</Card.Header>
              <div>{comment.fecha}</div>
              <Card.Body>
                <Card.Title>{comment.metodo_pago}</Card.Title>
                <div className={`estado ${estadoClase[comment.estado] || ''}`}>
                  {estadoTexto[comment.estado] }
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Historial;
