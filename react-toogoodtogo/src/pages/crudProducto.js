//CRUD_producto.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import CrudProductos from '../assets/components/CRUD-products';
import Chatbot from '../assets/components/Chatbot';
import '../assets/styles/crud-product.css';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
const CrudProducto = () => {
    const authToken = Cookies.get('authToken');
  
    // Si la cookie no está presente, redirigir al usuario a la página de login
    if (!authToken) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className='crud-producto-page'>
                <Header page={'RegistroProductos'}/>
                <DynamicBreadcrumb/>
                <CrudProductos/>
                <Chatbot/>
            </div>
        </div>
    );
};

export default CrudProducto;