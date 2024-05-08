import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Configura el objeto window.chatbotConfig
    window.chatbotConfig = {
      bot_id: "c973ce11-4188-43e5-9cae-24c89773cf5d",
    };

    const script = document.createElement('script');
    script.src = 'https://app.chatfly.co/Chat.js';
    script.async = true;

    script.onload = () => {
      console.log("El script del chatbot se ha cargado correctamente.");
    };

    script.onerror = () => {
      console.error("Error al cargar el script del chatbot.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      Loading chatbot...
    </div>
  );
};

export default Chatbot;
