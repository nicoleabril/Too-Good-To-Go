//addProducto.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import AddCategorias from '../assets/components/AddCategoria';
import ChatBot from '../assets/components/Chatbot';

const AddCategoria = () => {
    return (
        <div>
        <div className='add-categoria-page'>
            <Header page={'AgregarCategoria'}/>
            <DynamicBreadcrumb/>
            <AddCategorias/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default AddCategoria;