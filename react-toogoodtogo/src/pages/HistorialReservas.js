import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import Historial from '../assets/components/Historial-Reserva';
import Chatbot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

const HistorialReserva = () => {
    const authToken = Cookies.get('authToken');
  
    // Si la cookie no está presente, redirigir al usuario a la página de login
    if (!authToken) {
        return <Navigate to="/" />;
    }
    
    return (
        <div>
            <div className='crud-comentarios-page'>
                <Header page={'HistorialReserva'}/>
                <DynamicBreadcrumb/>
                <Historial/>
                <Chatbot/>
            </div>
        </div>
    );
};

export default HistorialReserva;