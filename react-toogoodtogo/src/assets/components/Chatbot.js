import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Configura el objeto window.chatbotConfig
    window.chatbotConfig = {
      bot_id: "c973ce11-4188-43e5-9cae-24c89773cf5d",
    };

    // Carga el script del chatbot
    const script = document.createElement('script');
    script.src = 'https://app.chatfly.co/Chat.js';
    script.async = true;

    // Maneja el evento onload para ejecutar código después de que el script se cargue
    script.onload = () => {
      // Coloca aquí cualquier código que necesite ejecutarse después de que el script se haya cargado completamente
      console.log("El script del chatbot se ha cargado correctamente.");
    };

    // Maneja errores de carga del script
    script.onerror = () => {
      console.error("Error al cargar el script del chatbot.");
    };

    // Agrega el script al final del body
    document.body.appendChild(script);

    // Devuelve una función de limpieza para desmontar el script del chatbot
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Devuelve un marcador mientras se carga el chatbot
  return (
    <div>
      Loading chatbot...
    </div>
  );
};

export default Chatbot;
