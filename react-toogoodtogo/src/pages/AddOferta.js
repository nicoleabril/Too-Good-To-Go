//addProducto.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import AddOfertas from '../assets/components/AddOferta';
import ChatBot from '../assets/components/Chatbot';

const AddOferta = () => {
    return (
        <div>
        <div className='add-producto-page'>
            <Header page={'AgregarProducto'}/>
            <DynamicBreadcrumb/>
            <AddOfertas/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default AddOferta;