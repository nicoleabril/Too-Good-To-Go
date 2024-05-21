//CRUD_categoria.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import CrudCategorias from '../assets/components/CRUD-categoria';
import Chatbot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

const CrudCategoria = () => {
    const authToken = Cookies.get('authToken');
  
    // Si la cookie no está presente, redirigir al usuario a la página de login
    if (!authToken) {
        return <Navigate to="/" />;
    }
    
    return (
        <div>
            <div className='crud-categoria-page'>
                <Header page={'RegistroCategoria'}/>
                <DynamicBreadcrumb/>
                <CrudCategorias/>
                <Chatbot/>
            </div>
        </div>
    );
};

export default CrudCategoria;