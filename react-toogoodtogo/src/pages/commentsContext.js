import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Importar js-cookie

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [businessNames, setBusinessNames] = useState({});
    const [clientNames, setClientNames] = useState({});
    const [loading, setLoading] = useState(true);
    const authToken = Cookies.get('authToken');

    const fetchBusinessNames = async (comments) => {
        const businessIds = [...new Set(comments.map(comment => comment.id_negocio))];
        const names = {};
        
        for (const id of businessIds) {
            try {
                const response = await axios.get(`http://localhost:8000/api/negocios/${id}`);
                names[id] = response.data.data.nombre_negocio;
            } catch (error) {
                console.error('Error al obtener nombres de negocios:', error);
            }
        }

        setBusinessNames(names);
    };

    const fetchClientNames = async (comments) => {
        const clientIds = [...new Set(comments.map(comment => comment.id_cliente))];
        const names = {};
        
        for (const id of clientIds) {
            try {
                const response = await axios.get(`http://localhost:8000/api/clientes/${id}`);
                names[id] = response.data.data.nombre;
            } catch (error) {
                console.error('Error al obtener nombres de clientes:', error);
            }
        }

        setClientNames(names);
    };

    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/comentarios', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            const comentarios = response.data.comentarios;
            setComments(comentarios);
            fetchBusinessNames(comentarios);
            fetchClientNames(comentarios);
            setLoading(false);
            
        } catch (error) {
            console.error('Error al obtener comentarios:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const deleteComment = (idComentario) => {
        setComments(comments.filter(comment => comment.id_comentario !== idComentario));
    };

    return (
        <CommentsContext.Provider value={{ comments, deleteComment, businessNames, clientNames, loading, fetchComments }}>
            {children}
        </CommentsContext.Provider>
    );
};

export { CommentsContext };
export default CommentsContext;
