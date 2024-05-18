//CRUD_categoria.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import CrudCategorias from '../assets/components/CRUD-categoria';
import Chatbot from '../assets/components/Chatbot';


const CrudCategoria = () => {
    return (
        <div>
            <div className='crud-categoria-page'>
                <Header page={'RegistroCategoria'}/>
                <DynamicBreadcrumb/>
                <CrudCategorias/>
                <Chatbot/>
            </div>
        </div>
    );
};

export default CrudCategoria;