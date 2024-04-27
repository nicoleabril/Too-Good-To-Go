
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb'
import HomeCliente from '../assets/components/HomeCliente';
const Cliente = () => {
  return (
    <div>
      <div>
      <Header/>
      </div>
      <div>
      <DynamicBreadcrumb />
      </div>
      <div>
      <HomeCliente/>
      </div>
    </div>
  );
};



export default Cliente;
