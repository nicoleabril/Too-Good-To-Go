// ClientePage.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import HomeNegocio from '../assets/components/HomeNegocio';
import Chatbot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
const NegocioPage = () => {
  const authToken = Cookies.get('authToken');
  
  // Si la cookie no está presente, redirigir al usuario a la página de login
  if (!authToken) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className='client-page'>
        <Header />
        <DynamicBreadcrumb/>
        <HomeNegocio/>
        <Chatbot/>
      </div>
    </div>
  );
};

export default NegocioPage;