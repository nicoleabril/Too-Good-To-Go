import React, { useContext, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import '../styles/comments.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { CommentsContext } from '../../pages/commentsContext';

const Historial = () => {
    const idNegocio = Cookies.get('id');
    //const [reservas, setReservas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const reservas = [
        {
          id: 1,
          nombreLugar: "Dunkin Donuts",
          fecha: "2024-05-10",
          metodo_pago: "Tarjeta",
          comentario: "El café es excelente y hay muchas opciones para elegir, desde el clásico hasta los sabores más innovadores como el pumpkin spice en otoño.",
          estado: "proceso" // Puede ser "cancelado", "proceso", "finalizado"
        },
        {
          id: 2,
          nombreLugar: "Starbucks",
          fecha: "2024-06-15",
          metodo_pago: "Efectivo",
          comentario: "Me encanta el ambiente y el servicio es muy bueno. Siempre encuentro algo nuevo para probar.",
          estado: "finalizado"
        },
        {
          id: 3,
          nombreLugar: "La Casa del Café",
          fecha: "2024-07-01",
          metodo_pago: "Efectivo",
          comentario: "Un lugar acogedor para disfrutar de una buena taza de café. El personal es muy amable.",
          estado: "cancelado"
        },
        {
          id: 4,
          nombreLugar: "Café de la Plaza",
          fecha: "2024-07-20",
          metodo_pago: "Tarjeta de Credito",
          comentario: "Excelente lugar para reunirse con amigos. El café es delicioso y los precios son razonables.",
          estado: "finalizado"
        },
        {
          id: 5,
          nombreLugar: "Café y Té",
          fecha: "2024-08-05",
          metodo_pago: "Transferencia",
          comentario: "El té de menta es mi favorito. Siempre tienen opciones frescas y saludables.",
          estado: "finalizado"
        }
      ];
      

    const estadoClase = {
        cancelado: 'btn-cancelado',
        proceso: 'btn-proceso',
        finalizado: 'btn-finalizado'
      };
    
      const estadoTexto = {
        cancelado: 'Cancelado',
        proceso: 'En Proceso',
        finalizado: 'Finalizado'
      };

    /*useEffect(() => {
        const obtenerReservas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/reservas/${idNegocio}`);
                setReservas(response.data.categorias);
            } catch (error) {
                console.error('Error al obtener reservas:', error);
            }
        };

        obtenerReservas();
    }, []); */

    return (
        <div className="container-comments">
            <div className="comments-list">
                {reservas.map(comment => (
                    <Card key={comment.id} className="mb-3">
                        <Card.Header>{comment.nombreLugar}</Card.Header>
                        <div>{comment.fecha}</div>
                        <Card.Body>
                            <Card.Title>{comment.metodo_pago}</Card.Title>
                            <div className={`estado ${estadoClase[comment.estado]}`}>
                            {estadoTexto[comment.estado]}
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Historial;
