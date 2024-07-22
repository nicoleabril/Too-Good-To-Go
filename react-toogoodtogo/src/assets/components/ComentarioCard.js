import React, { useState } from "react";
import '../styles/comentario.css'
import ensalada from '../images/ensalada.png'
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';

const ComentarioCard = () => {
  const idNegocio = sessionStorage.getItem("id_negocio");
  const idCliente = Cookies.get('id');
  const [comentario, setComentario] = useState('');

  const handleAddComentario = async (e) => {
    try {
      e.preventDefault();
      if(comentario.trim() !== ''){
        const formData = new FormData();
        formData.append('id_negocio', idNegocio); // Ajusta según tu lógica de categoría seleccionada
        formData.append('id_cliente', idCliente);
        formData.append('descripcion', comentario);
        const response = await axios.post(`http://localhost:8000/api/comentarios/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Enviado');
        setComentario('');
      }else{
        toast.error('Ingresa un comentario.');
      }
    } catch (error) {
      toast.error('Error al enviar.');
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
                <textarea placeholder="Escribe aquí tu experiencia." className="text-area" onChange={(e) => setComentario(e.target.value)}></textarea>
                <button className="submit-button" onClick={handleAddComentario}>Enviar</button>
            </div>
        </div>
        <ToastContainer
            closeButtonStyle={{
                fontSize: '12px', // Tamaño de fuente del botón de cerrar
                padding: '4px'    // Espaciado interno del botón de cerrar
            }}
            style={{ width: '400px' }} // Ancho deseado para ToastContainer
            />
    </div>
  );
};

export default ComentarioCard;