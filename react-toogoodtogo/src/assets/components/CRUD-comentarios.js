import React, { useContext, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import '../styles/comments.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CommentsContext } from '../../pages/commentsContext';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

const Comments = () => {
    const { comments, deleteComment, businessNames, clientNames, loading, fetchComments } = useContext(CommentsContext);

    useEffect(() => {
        fetchComments(); // Obtener comentarios actualizados cada vez que se carga la página
    }, []);

    const eliminarComentario = async (idComentario) => {
        try {
            await axios.delete(`http://localhost:8000/api/comentarios/${idComentario}`);
            deleteComment(idComentario);
            toast.success('Comentario eliminado correctamente');
            fetchComments(); // Actualizar la lista después de eliminar
        } catch (error) {
            toast.error('Error al eliminar el comentario');
            console.error('Error al eliminar comentario:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading-spinner">
                <div>
                    <Spinner animation="grow" variant="danger" role="status" />
                    <p>Cargando ...</p>
                </div>
            </div>
        );
    }

    if (!comments || comments.length === 0) {
        return <div className="loading-spinner">No hay comentarios disponibles.</div>;
    }
    return (
        <div className="container-comments">
            <div className="comments-list">
            {comments.map(comment => {
                const creationDate = moment(comment.fecha_creacion);
                const now = moment();
                const diffMinutes = now.diff(creationDate, 'minutes');

                return (
                    <Card key={comment.id_comentario} className="mb-3">
                        <Card.Header>{businessNames[comment.id_negocio] || 'Negocio Desconocido'}</Card.Header>
                        <div>{creationDate.format('YYYY-MM-DD HH:mm:ss')}</div>
                        <Card.Body>
                            <Card.Title>{clientNames[comment.id_cliente] || 'Cliente Desconocido'}</Card.Title>
                            <Card.Text>{comment.descripcion}</Card.Text>
                        </Card.Body>
                        {diffMinutes <= 15 && (
                            <div className='botones_comentario'>
                                <Link to={`/RegistroComentarios/EditarComentarios/${comment.id_comentario}`} >
                                    <Button className="btnEditar" onClick={() => {
                                        sessionStorage.setItem('comment', JSON.stringify(comment));
                                    }} variant="outline-primary"><FiEdit size={25} /></Button>
                                </Link>
                                <Button variant="outline-danger" size="sm" className="btnEliminar"
                                    onClick={() => eliminarComentario(comment.id_comentario)}><BsTrash size={25} />
                                </Button>
                            </div>
                        )}
                    </Card>
                );
            })}

            </div>
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

export default Comments;
