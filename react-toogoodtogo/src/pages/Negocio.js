//CRUD_categoria.js
import React, { useState, useEffect } from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import AddNegocio from '../assets/components/AddNegocio';
import Chatbot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

const Negocio = () => {
    // Verificar si la cookie authToken está presente
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
                <AddNegocio/>
                <Chatbot/>
            </div>
        </div>
    );
};

export default Negocio;