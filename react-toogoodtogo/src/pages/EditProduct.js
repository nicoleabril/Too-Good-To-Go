import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import EditProducts from '../assets/components/EditProduct';
import ChatBot from '../assets/components/Chatbot';

const EditProduct = () => {
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