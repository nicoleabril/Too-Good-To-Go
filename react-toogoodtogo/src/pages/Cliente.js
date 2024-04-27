
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb'
import HomeCliente from '../assets/components/HomeCliente';

const Cliente = () => {
  return (
    <div style={{ overflowY: 'auto' }}> 
      <Header />
      <DynamicBreadcrumb />
      <HomeCliente />
    </div>
  );
};

export default Cliente;
