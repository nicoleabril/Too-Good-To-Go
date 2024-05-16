// ClientePage.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import HomeCliente from '../assets/components/HomeCliente';
import '../assets/styles/cliente.css'
import Chatbot from '../assets/components/Chatbot';
const ClientePage = () => {
  return (
    <div>
      <div className='client-page'>
        <Header />
        <DynamicBreadcrumb/>
        <HomeCliente />
        <Chatbot/>
      </div>
    </div>
  );
};

export default ClientePage;