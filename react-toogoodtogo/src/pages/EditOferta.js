import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import EditOfertas from '../assets/components/EditOferta';
import ChatBot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
const EditOferta = () => {
    const authToken = Cookies.get('authToken');
  
    // Si la cookie no está presente, redirigir al usuario a la página de login
    if (!authToken) {
        return <Navigate to="/" />;
    }
    return (
        <div>
        <div className='add-productoEdit-page'>
            <Header page={'EditarProducto'}/>
            <DynamicBreadcrumb/>
            <EditOfertas/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default EditOferta;