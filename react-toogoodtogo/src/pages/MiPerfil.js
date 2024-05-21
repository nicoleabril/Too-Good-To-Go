import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import AddCategorias from '../assets/components/MiPerfil';
import ChatBot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
const AddCategoria = () => {
    const authToken = Cookies.get('authToken');
  
    // Si la cookie no está presente, redirigir al usuario a la página de login
    if (!authToken) {
        return <Navigate to="/" />;
    }
    return (
        <div>
        <div className='add-miPerfil-page'>
            <Header page={'MiPerfil'}/>
            <DynamicBreadcrumb/>
            <AddCategorias/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default AddCategoria;