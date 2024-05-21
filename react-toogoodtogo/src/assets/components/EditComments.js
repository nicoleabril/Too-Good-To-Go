import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/editComments.css';

const EditComments = ({ comment, onSave, onCancel, comments, setComments }) => {
    const [editedComment, setEditedComment] = useState(comment ? comment.comment : '');

    const handleSave = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        onSave({ ...comment, comment: editedComment, date: currentDate });
        // Actualizar la lista de comentarios llamando a la función setComments del componente padre
        const updatedCommentList = [...comments].map(item =>
            item.id === comment.id ? { ...item, comment: editedComment, date: currentDate } : item
        );
        setComments(updatedCommentList);
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
        </div>
    );
};

export default EditComments;
