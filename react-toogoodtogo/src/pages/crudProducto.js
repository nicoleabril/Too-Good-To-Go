//CRUD_producto.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import CrudProductos from '../assets/components/CRUD-products';
import Chatbot from '../assets/components/Chatbot';

const CrudProducto = () => {
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