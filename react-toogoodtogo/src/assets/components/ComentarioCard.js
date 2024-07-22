import React, { useState } from "react";
import '../styles/comentario.css';
import ensalada from '../images/ensalada.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComentarioCard = () => {
  const idNegocio = sessionStorage.getItem("id_negocio");
  const idCliente = Cookies.get('id');
  const [comentario, setComentario] = useState('');

  const handleAddComentario = async (e) => {
    try {
      e.preventDefault();
      if (comentario.trim() !== '') {
        const formData = new FormData();
        formData.append('id_negocio', idNegocio);
        formData.append('id_cliente', idCliente);
        formData.append('descripcion', comentario);
        await axios.post(`http://localhost:8000/api/comentarios/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Comentario enviado.');
        setComentario('');
      } else {
        toast.error('Por favor, ingresa un comentario.');
      }
    } catch (error) {
      toast.error('Error al enviar el comentario.');
      console.error('Error al enviar comentario:', error);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <div className="contact-form-container">
        <img src={ensalada} alt="Salad" className="salad-image" />
        <div className="form-section">
          <h2>¿CÓMO HA ESTADO LA COMIDA?</h2>
          <p>Envíanos un correo y lo tendremos en cuenta lo antes posible</p>
          <textarea
            placeholder="Escribe aquí tu experiencia."
            className="text-area"
            onChange={(e) => setComentario(e.target.value)}
            value={comentario} // Asegúrate de que el valor del textarea esté controlado
          ></textarea>
          <button className="submit-button" onClick={handleAddComentario}>Enviar</button>
        </div>
      </div>
      <ToastContainer
        position="top-right" // Posición del ToastContainer
        autoClose={5000} // Duración de la notificación
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false} // Esconder botón de cerrar
        style={{ zIndex: 9999, marginTop: '100px' }}
      />
    </div>
  );
};

export default ComentarioCard;
