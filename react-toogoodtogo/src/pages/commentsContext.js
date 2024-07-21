import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [businessNames, setBusinessNames] = useState({});
    const [clientNames, setClientNames] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/comentarios');
                setComments(response.data.comentarios);
            } catch (error) {
                console.error('Error al obtener comentarios:', error);
            }
        };

        const fetchBusinessNames = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/negocios');
                console.log('Negocios:', response.data); // Añadido para depuración
                if (Array.isArray(response.data.data)) {
                    const names = response.data.data.reduce((acc, negocio) => {
                        acc[negocio.id_negocio] = negocio.nombre_negocio;
                        return acc;
                    }, {});
                    setBusinessNames(names);
                } else {
                    console.error('El formato de datos de negocios no es correcto:', response.data);
                }
            } catch (error) {
                console.error('Error al obtener nombres de negocios:', error);
            }
        };

        const fetchClientNames = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/clientes');
                console.log('Clientes:', response.data); // Añadido para depuración
                if (Array.isArray(response.data.data)) {
                    const names = response.data.data.reduce((acc, cliente) => {
                        acc[cliente.id_cliente] = cliente.nombre;
                        return acc;
                    }, {});
                    setClientNames(names);
                } else {
                    console.error('El formato de datos de clientes no es correcto:', response.data);
                }
            } catch (error) {
                console.error('Error al obtener nombres de clientes:', error);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await fetchComments();
            await fetchBusinessNames();
            await fetchClientNames();
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <CommentsContext.Provider value={{ comments, setComments, businessNames, clientNames, loading }}>
            {children}
        </CommentsContext.Provider>
    );
};

export { CommentsContext };
export default CommentsContext;
