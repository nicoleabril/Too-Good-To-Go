//addProducto.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import AddProducts from '../assets/components/AddProduct';
import ChatBot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
const AddProduct = () => {
    const authToken = Cookies.get('authToken');
  
    // Si la cookie no está presente, redirigir al usuario a la página de login
    if (!authToken) {
        return <Navigate to="/" />;
    }
    
    return (
        <div>
        <div className='add-producto-page'>
            <Header page={'AgregarProducto'}/>
            <DynamicBreadcrumb/>
            <AddProducts/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default AddProduct;