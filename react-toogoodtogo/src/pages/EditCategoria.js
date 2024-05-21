import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import EditCategorias from '../assets/components/EditCategoria';
import ChatBot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
const EditCategoria = () => {
    const authToken = Cookies.get('authToken');
  
    // Si la cookie no está presente, redirigir al usuario a la página de login
    if (!authToken) {
        return <Navigate to="/" />;
    }
    return (
        <div>
        <div className='add-categoria-page'>
            <Header page={'EditarCategoria'}/>
            <DynamicBreadcrumb/>
            <EditCategorias/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default EditCategoria;