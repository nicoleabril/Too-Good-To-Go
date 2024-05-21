import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import CrudComentarios from '../assets/components/CRUD-comentarios';
import Chatbot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

const CrudComentario = () => {
    const authToken = Cookies.get('authToken');
  
    // Si la cookie no está presente, redirigir al usuario a la página de login
    if (!authToken) {
        return <Navigate to="/" />;
    }
    
    return (
        <div>
            <div className='crud-comentarios-page'>
                <Header page={'RegistroComentarios'}/>
                <DynamicBreadcrumb/>
                <CrudComentarios/>
                <Chatbot/>
            </div>
        </div>
    );
};

export default CrudComentario;