import React, { useEffect } from 'react';
import Cookies from 'js-cookie';  // Importar js-cookie

import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import Home from '../assets/components/Home';
import '../assets/styles/informativa.css';
import Chatbot from '../assets/components/Chatbot';

const BienvenidaPage = () => {
  
  // Función para eliminar todas las cookies
  const eliminarTodasLasCookies = () => {
    const cookies = Cookies.get();
    for (let cookie in cookies) {
      Cookies.remove(cookie);
    }
  };

  // Llamar a la función al cargar el componente
  useEffect(() => {
    eliminarTodasLasCookies();
  }, []);

  return (
    <div>
      <div className='bienvenida-page'>
        <Header page={'Informativa'}/>
        <DynamicBreadcrumb/>
        <Home />
        <Chatbot></Chatbot>
      </div>
    </div>
  );
};

export default BienvenidaPage;
