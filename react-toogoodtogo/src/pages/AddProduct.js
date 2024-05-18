//addProducto.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import AddProducts from '../assets/components/AddProduct';
import ChatBot from '../assets/components/Chatbot';

const AddProduct = () => {
    return (
        <div>
        <div className='add-producto-page'>
            <Header page={'agregarProducto'}/>
            <DynamicBreadcrumb/>
            <AddProducts/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default AddProduct;