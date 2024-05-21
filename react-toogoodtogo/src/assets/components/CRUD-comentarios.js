import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import '../styles/comments.css';
import { Link } from 'react-router-dom';
// Import the commentsContext que se encuentra en la carpeta pages y CRUD-comentarios.js de la carpeta assets/components
import { CommentsContext } from '../../pages/commentsContext';

const Comments = () => {
    const { comments, deleteComment } = useContext(CommentsContext);

    return (
        <div className="container-comments">
            <Link to={`/RegistroComentarios/AgregarComentarios`} className="add-comment-button">
                <Button variant="primary"><FiPlus size={25} /></Button>
            </Link>
            <div className="comments-list">
                {comments.map(comment => (
                    <Card key={comment.id} className="mb-3">
                        <Card.Header>{comment.restaurant}</Card.Header>
                        <div>{comment.date}</div>
                        <Card.Body>
                            <Card.Title>{comment.user}</Card.Title>
                            <Card.Text>{comment.comment}</Card.Text>
                        </Card.Body>
                        <div className='botones_comentario'>
                            <Link to={`/RegistroComentarios/EditarComentarios/${comment.id}`} className="btnEditar">
                                <Button variant="outline-primary"><FiEdit size={25} /></Button>
                            </Link>
                            <Button variant="outline-danger" size="sm" className="btnEliminar" 
                                onClick={() => deleteComment(comment.id)}><BsTrash size={25} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Comments;
