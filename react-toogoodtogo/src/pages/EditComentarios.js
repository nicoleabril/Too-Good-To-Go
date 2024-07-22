import React, { useState, useEffect } from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import EditComments from '../assets/components/EditComments';
import Chatbot from '../assets/components/Chatbot';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';


const EditarComentarios = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Lista de comentarios vacía por defecto
    const [comments, setComments] = useState([]);

    // Estado para almacenar el comentario que estamos editando
    const [editingComment, setEditingComment] = useState(null);

    // Buscar el comentario correspondiente al ID en los parámetros de la URL
    useEffect(() => {
        const foundComment = comments.find(comment => comment.id === parseInt(id));
        if (foundComment) {
            setEditingComment(foundComment);
        }
    }, [comments, id]);

    // Función para guardar los cambios
    const handleSave = (editedComment) => {
        const updatedComments = comments.map(comment =>
            comment.id === editedComment.id ? editedComment : comment
        );
        setComments(updatedComments);
        
    };

    // Función para cancelar la edición
    const handleCancel = () => {
        navigate(-1); // Regresar a la página anterior después de guardar
    };

    const authToken = Cookies.get('authToken');
  
    // Si la cookie no está presente, redirigir al usuario a la página de login
    if (!authToken) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className='crud-editComentarios-page'>
                <Header page={'EditarComentarios'}/>
                <DynamicBreadcrumb/>
                <div className='crud-editComentarios-container'>
                    <EditComments
                        comment={editingComment}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        comments={comments}
                        setComments={setComments}
                    />
                </div>
                 
                            
                <Chatbot/>
            </div>
            
        </div>
    );
};

export default EditarComentarios;