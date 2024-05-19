import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import EditCategorias from '../assets/components/EditCategoria';
import ChatBot from '../assets/components/Chatbot';

const EditCategoria = () => {
    return (
        <div>
        <div className='add-categoria-page'>
            <Header page={'EditarCategoria'}/>
            <DynamicBreadcrumb/>
            <EditCategorias/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default EditCategoria;