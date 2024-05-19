//CRUD_producto.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import CRUDOferta from '../assets/components/CRUD-oferta';
import Chatbot from '../assets/components/Chatbot';
import '../assets/styles/crud-product.css';

const CrudOferta = () => {
    return (
        <div>
            <div className='crud-producto-page'>
                <Header page={'RegistroProductos'}/>
                <DynamicBreadcrumb/>
                <CRUDOferta/>
                <Chatbot/>
            </div>
        </div>
    );
};

export default CrudOferta;