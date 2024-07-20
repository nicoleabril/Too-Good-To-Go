import React from 'react';
import '../styles/comentario.css'
import ensalada from '../images/ensalada.png'

const ComentarioCard = () => {
  return (
    <div className="contact-form-wrapper">
        <div className="contact-form-container">
            <img src={ensalada} alt="Salad" className="salad-image" />
            <div className="form-section">
                <h2>¿CÓMO HA ESTADO LA COMIDA?</h2>
                <p>Envíanos un correo y lo tendremos en cuenta lo antes posible</p>
                <textarea placeholder="Escribe aquí tu experiencia." className="text-area"></textarea>
                <button className="submit-button">Enviar</button>
            </div>
        </div>
    </div>
  );
};

export default ComentarioCard;