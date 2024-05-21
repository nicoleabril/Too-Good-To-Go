// ClientePage.js
import React, {useState} from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import HomeRestaurante from '../assets/components/HomeRestaurante';
import '../assets/styles/cliente.css'
import Chatbot from '../assets/components/Chatbot';
import { Navigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

const RestaurantePage = () => {
  // Define el estado para el número de artículos en el carrito
  const [cartCount, setCartCount] = useState(0);
  const authToken = Cookies.get('authToken');
  
  // Si la cookie no está presente, redirigir al usuario a la página de login
  if (!authToken) {
    return <Navigate to="/" />;
  }


  // Función para manejar el clic del botón "Comprar"
  const handleBuyClick = () => {
    console.log('carrito de compras: ', cartCount+1);
    setCartCount(cartCount + 1); // Incrementa el contador del carrito
  };

  

  return (
    <div>
      <div className='client-page'>
        <Header cartCount={cartCount}/>
        <DynamicBreadcrumb/>
        <HomeRestaurante onBuyClick={handleBuyClick}/>
        <Chatbot/>
      </div>
    </div>
  );
};

export default RestaurantePage;