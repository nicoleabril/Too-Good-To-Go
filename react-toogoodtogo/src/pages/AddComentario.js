import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import AddComentario from '../assets/components/AddComentario';
import ChatBot from '../assets/components/Chatbot';

const AddComment = () => {
    return (
        <div>
        <div className='add-comment-page'>
            <Header page={'AgregarComentario'}/>
            <DynamicBreadcrumb/>
            <AddComentario/>
            <ChatBot/>
        </div>
        </div>
    );
};

export default AddComment;