import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/addComments.css';
import CommentsContext from '../../pages/commentsContext';

const AddComment = () => {
    const { addComment } = useContext(CommentsContext);
    const [restaurant, setRestaurant] = useState('');
    const [user, setUser] = useState('Camila Granda');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!restaurant) newErrors.restaurant = 'El restaurante es requerido';
        if (!comment) newErrors.comment = 'El comentario es requerido';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const nuevoComentario = {
            restaurant,
            user,
            comment,
            date,
        };

        addComment(nuevoComentario);
        navigate('/RegistroComentarios');
    };

    return (
        <div className="container-add-comt">
            <div className="container-add-comment">
                <h3>Agregar Comentario</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formRestaurant">
                        <Form.Label>Restaurante</Form.Label>
                        <Form.Control
                            as="select"
                            value={restaurant}
                            onChange={(e) => setRestaurant(e.target.value)}
                            isInvalid={!!errors.restaurant}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="Dunkin Donuts">Dunkin Donuts</option>
                            <option value="KFC-Mall del Río">KFC-Mall del Río</option>
                            <option value="BurgerKing">BurgerKing</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.restaurant}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formUser">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.user}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDate">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control
                            type="text"
                            value={date}
                            readOnly
                        />
                    </Form.Group>
                    <div className='addcomment-textarea'>
                        <Form.Group controlId="formComment">
                            <Form.Label>Comentario</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                isInvalid={!!errors.comment}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.comment}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <Button variant="primary" type="submit">Guardar</Button>
                </Form>
            </div>
            <footer className="contenedorFooter-addComentarios">
                <div className="textoFooter2">
                    Copyright © 2024 Too Good To Go International. All Rights Reserved.
                </div>
            </footer>
            <div className="waves-background2-addComentarios"></div>
        </div>
    );
};

export default AddComment;
