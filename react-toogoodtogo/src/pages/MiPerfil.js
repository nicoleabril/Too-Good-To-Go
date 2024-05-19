import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import AddCategorias from '../assets/components/MiPerfil';
import ChatBot from '../assets/components/Chatbot';

const AddCategoria = () => {
    return (
        <div>
        <div className='add-miPerfil-page'>
            <Header page={'MiPerfil'}/>
            <DynamicBreadcrumb/>
            <AddCategorias/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default AddCategoria;