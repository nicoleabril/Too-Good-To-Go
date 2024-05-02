// ClientePage.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import HomeRestaurante from '../assets/components/HomeRestaurante';
import '../assets/styles/cliente.css'

const RestaurantePage = () => {
  return (
    <div>
      <div className='client-page'>
      <Header />
      <DynamicBreadcrumb/>
      <HomeRestaurante />
      </div>
    </div>
  );
};

export default RestaurantePage;