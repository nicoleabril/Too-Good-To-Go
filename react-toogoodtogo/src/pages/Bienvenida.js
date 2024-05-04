// ClientePage.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import Home from '../assets/components/Home';
import '../assets/styles/informativa.css'

const BienvenidaPage = () => {
  return (
    <div>
      <div className='bienvenida-page'>
        <Header page={'Informativa'}/>
        <DynamicBreadcrumb/>
        <Home />
      </div>
    </div>
  );
};

export default BienvenidaPage;