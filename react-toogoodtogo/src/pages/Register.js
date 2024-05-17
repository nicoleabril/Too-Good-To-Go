import React, { useState, useEffect } from "react";
import '../assets/styles/registro.css'
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import Chatbot from '../assets/components/Chatbot';
function Register() {
  const [currentSlide, setCurrentSlide] = useState('cliente');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide === 'cliente' ? 'negocio' : 'cliente');
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide]);

    return (
      <>
        <Header page={'Informativa'}/>
        <DynamicBreadcrumb/>
        <div className="RegisterContainer">
            <div className='textoImagen'>
              <h1 className='textoToGo'>¡Hagamos algo grande juntos! </h1>
              <h1 className='textoTooGood'>Regístrate</h1>
              <div className='textoInformativo'>
                  <p className='subtexto'>Únete a nuestro equipo y evita el desperdicio de comida. ¡Too Good To Go te lo hace posible!</p>
              </div>
            </div>
            <div className="botonesRegistro">
              <a href="/Registro-Cliente"><button className='buttonRegistrarse'>Cliente</button></a>
              <a href="/Registro-Negocio"><button className='buttonIniciarSesion'>Negocio</button></a>
            </div>
            <div className="waves-background2"></div>
            <div className="contenedorFooterRegistro">
              <div className="textoFooter2">
                Copyright © 2024 Too Good To Go International. All Rights Reserved.
              </div>
            </div>
        </div>
        <Chatbot></Chatbot>
      </>
    );
  }
  export default Register;