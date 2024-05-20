import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import "../styles/comments.css";

const Comments = () => {
    const commentsData = [
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
    ];

    return (
        <div className="container-comments">
            <Button variant="primary" className="add-comment-button">
                <FiPlus size={25} />
            </Button>
            <div className="comments-list">
                {commentsData.map(comment => (
                    <Card key={comment.id} className="mb-3">
                        <Card.Header>{comment.restaurant}</Card.Header>
                        <div>{comment.date}</div>
                        <Card.Body>
                            <Card.Title>{comment.user}</Card.Title>
                            <Card.Text>{comment.comment}</Card.Text>
                        </Card.Body>
                        <div className='botones_comentario'>
                            <Button variant="outline-primary" size="sm" className="mx-1">
                                <FiEdit size={25} /> 
                            </Button>
                            <Button variant="outline-danger" size="sm" className="mx-2">
                                <BsTrash size={25} /> 
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
            <footer className="contenedorFooter-comentarios">
                <div className="textoFooter2">
                    Copyright © 2024 Too Good To Go International. All Rights Reserved.
                </div>
            </footer>
            <div className="waves-background2-comentarios"></div>
        </div>
    );
};

export default Comments;


