import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import EditProducts from '../assets/components/EditProduct';
import ChatBot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
const EditProduct = () => {
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
            <EditProducts/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default EditProduct;