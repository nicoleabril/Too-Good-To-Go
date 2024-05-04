// ClientePage.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import Home from '../assets/components/Home';
import '../assets/styles/bienvenida.css'

const BienvenidaPage = () => {
  return (
    <div>
      <div className='client-page'>
      <Header />
      <DynamicBreadcrumb/>
      <Home />
      </div>
    </div>
  );
};

export default BienvenidaPage;