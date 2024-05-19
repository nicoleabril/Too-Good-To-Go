//CRUD_categoria.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import AddNegocio from '../assets/components/AddNegocio';
import Chatbot from '../assets/components/Chatbot';


const Negocio = () => {
    return (
        <div>
            <div className='crud-categoria-page'>
                <Header page={'RegistroCategoria'}/>
                <DynamicBreadcrumb/>
                <AddNegocio/>
                <Chatbot/>
            </div>
        </div>
    );
};

export default Negocio;