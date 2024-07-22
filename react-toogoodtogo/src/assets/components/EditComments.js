import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/editComments.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EditComments = ({ comment, onSave, onCancel, comments, setComments }) => {
    const [editedComment, setEditedComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedComment = JSON.parse(sessionStorage.getItem('comment'));
        if (storedComment) {
            setEditedComment(storedComment.descripcion);
        } else if (comment) {
            setEditedComment(comment.descripcion);
        }
    }, [comment]);

    const handleSave = async () => {
        try {
            const storedComment = JSON.parse(sessionStorage.getItem('comment'));
            const response = await axios.post(`http://localhost:8000/api/updateComentario/${storedComment.id_comentario}`, {
                descripcion: editedComment
            });
            const updatedComment = { ...storedComment, descripcion: editedComment };
            const updatedCommentList = comments.map(item =>
                item.id_comentario === updatedComment.id_comentario ? updatedComment : item
            );
            setComments(updatedCommentList);

            sessionStorage.setItem('comment', JSON.stringify(updatedComment));

            onSave(updatedComment);

            toast.success('Comentario actualizado correctamente', {
                onClose: () => navigate('/RegistroComentarios')
            });
        } catch (error) {
            toast.error('Error al guardar el comentario');
        }
    };

    return (
        <div className="container-editComentarios">
            <div className="container-editComments">
                <h1>Editar Comentario</h1>
                <Form className='formularioComentarioEdit'>
                    <Form.Group controlId="formComment">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                        />
                    </Form.Group>
                    <div className="BotonesEdicionComentario">
                        <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
                        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                    </div>
                </Form>
            </div>
            <footer className="contenedorFooter-editComentarios">
                <div className="textoFooter2">
                    Copyright © 2024 Too Good To Go International. All Rights Reserved.
                </div>
            </footer>
            <div className="waves-background2-editComentarios"></div>
            <ToastContainer
            closeButtonStyle={{
                fontSize: '10px', // Tamaño de fuente del botón de cerrar
                padding: '4px'    // Espaciado interno del botón de cerrar
            }}
            style={{ width: '400px' }} // Ancho deseado para ToastContainer
            />
        </div>
    );
};

export default EditComments;
