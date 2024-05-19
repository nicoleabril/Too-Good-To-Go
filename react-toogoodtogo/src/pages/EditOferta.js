import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import EditOfertas from '../assets/components/EditOferta';
import ChatBot from '../assets/components/Chatbot';

const EditOferta = () => {
    return (
        <div>
        <div className='add-productoEdit-page'>
            <Header page={'EditarProducto'}/>
            <DynamicBreadcrumb/>
            <EditOfertas/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default EditOferta;