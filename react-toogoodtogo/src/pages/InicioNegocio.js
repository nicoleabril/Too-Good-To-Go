// ClientePage.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import HomeNegocio from '../assets/components/HomeNegocio';
import '../assets/styles/cliente.css'
import Chatbot from '../assets/components/Chatbot';
const NegocioPage = () => {
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