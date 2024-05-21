import React, { createContext, useState } from 'react';

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
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

    const addComment = (comment) => {
        setComments([...comments, { ...comment, id: comments.length + 1 }]);
    };

    const deleteComment = (id) => {
        setComments(comments.filter(comment => comment.id !== id));
    };

    return (
        <CommentsContext.Provider value={{ comments, addComment, deleteComment }}>
            {children}
        </CommentsContext.Provider>
    );
};

export { CommentsContext };
export default CommentsContext;
