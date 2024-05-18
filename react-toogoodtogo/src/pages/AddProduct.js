//addProducto.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import AddProduct from '../assets/components/AddProduct';
import ChatBot from '../assets/components/Chatbot';

const addProduct = () => {
    return (
        <div>
        <div className='add-producto-page'>
            <Header page={'agregarProducto'}/>
            <DynamicBreadcrumb/>
            <AddProduct/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default addProduct;