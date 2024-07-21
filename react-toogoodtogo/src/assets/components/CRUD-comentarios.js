import React, { useContext } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import '../styles/comments.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CommentsContext } from '../../pages/commentsContext';

const Comments = () => {
    const { comments, setComments, businessNames, clientNames, loading } = useContext(CommentsContext);

    const eliminarComentario = async (idComentario) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/comentarios/${idComentario}`);
            console.log('Comentario eliminado:', response.data);
            const nuevosComentarios = comments.filter((com) => com.id_comentario !== idComentario);
            setComments(nuevosComentarios);
        } catch (error) {
            console.error('Error al eliminar comentario:', error);
        }
    };

    const editarComentario = async (idComentario, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/comentarios/${idComentario}`, updatedData);
            console.log('Comentario editado:', response.data);
            const nuevosComentarios = comments.map((com) => 
                com.id_comentario === idComentario ? { ...com, ...updatedData } : com
            );
            setComments(nuevosComentarios);
        } catch (error) {
            console.error('Error al editar comentario:', error);
        }
    };

    if (loading) {
        return (
            <div className="loading-spinner">
                <div>
                    <Spinner animation="grow" variant="danger" role="status">
                    </Spinner>
                    <p>Cargando ...</p>
                </div>
            </div>
        );
    }

    if (!comments || comments.length === 0) {
        return <div>No hay comentarios disponibles.</div>;
    }
    console.log("Nombre de negocios", businessNames);
    console.log("Nombre de clientes", clientNames);
    return (
        <div className="container-comments">
            <div className="comments-list">
                {comments.map(comment => (
                    <Card key={comment.id_comentario} className="mb-3 contenedorPrincipalCards">
                        <Card.Header>{businessNames[comment.id_negocio] || 'Negocio Desconocido'}</Card.Header>
                        <div>{comment.fecha_creacion}</div>
                        <Card.Body>
                            <Card.Title>{clientNames[comment.id_cliente] || 'Cliente Desconocido'}</Card.Title>
                            <Card.Text>{comment.descripcion}</Card.Text>
                        </Card.Body>
                        <div className='botones_comentario'>
                            <Link to={`/RegistroComentarios/EditarComentarios/${comment.id_comentario}`} className="btnEditar">
                                <Button variant="outline-primary"><FiEdit size={25} /></Button>
                            </Link>
                            <Button variant="outline-danger" size="sm" className="btnEliminar" 
                                onClick={() => eliminarComentario(comment.id_comentario)}><BsTrash size={25} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Comments;
