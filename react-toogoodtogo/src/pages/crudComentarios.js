import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import CrudComentarios from '../assets/components/CRUD-comentarios';
import Chatbot from '../assets/components/Chatbot';


const CrudComentario = () => {
    return (
        <div>
            <div className='crud-comentarios-page'>
                <Header page={'RegistroComentarios'}/>
                <DynamicBreadcrumb/>
                <CrudComentarios/>
                <Chatbot/>
            </div>
        </div>
    );
};

export default CrudComentario;