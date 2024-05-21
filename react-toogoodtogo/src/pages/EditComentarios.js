import React, { useState, useEffect } from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import EditComments from '../assets/components/EditComments';
import Chatbot from '../assets/components/Chatbot';
import { useParams, useNavigate } from 'react-router-dom';

const EditarComentarios = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Lista de comentarios, puedes obtenerla de tu estado o de una API
    const [comments, setComments] = useState([
        {
            id: 1,
            restaurant: 'Dunkin Donuts',
            user: 'Camila Granda',
            comment: 'El café es excelente y hay muchas opciones para elegir, desde el clásico hasta los sabores más innovadores como el pumpkin spice en otoño.',
            date: '2024-05-10'
        },
        {
            id: 2,
            restaurant: 'KFC-Mall del Río',
            user: 'Camila Granda',
            comment: 'El ambiente es relajado y cómodo, perfecto para una pausa rápida durante el día. Las sillas y mesas son cómodas, ideal para trabajar un rato con el portátil.',
            date: '2024-05-12'
        },
    ]);

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
        navigate(-1); // Regresar a la página anterior después de guardar
    };

    // Función para cancelar la edición
    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div>
            <div className='crud-editComentarios-page'>
                <Header page={'EditarComentarios'}/>
                <DynamicBreadcrumb/>
                {editingComment && <EditComments comment={editingComment} onSave={handleSave} onCancel={handleCancel} comments={comments} setComments={setComments} />}                <Chatbot/>
            </div>
        </div>
    );
};

export default EditarComentarios;