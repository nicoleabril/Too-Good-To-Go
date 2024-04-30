import React from 'react';
import '../styles/cliente.css'
import pizza from '../images/pizza.png'
import LocalesCards from './LocalesCards';
function HomeCliente() {
    
  
    return (
    
        <div>
            <div className='textoImagen'>
            <h1 className='texto1'>Tu comida favorita</h1>
            <h1 className='texto2'>al mejor precio</h1>
            <p className='subtexto'>Revisa todas las ofertas, ¡Seguro te encantarán!</p>
            </div>
            <div className="imagenPizza">
            <img src={pizza} alt="Pizza" className="imagen2" />
            </div>
            <div className="waves-background2"></div>
            <div className="contenedorRojo">
            </div>
            <div className="contenedorBlanco">
                    <h1>OFERTAS</h1>
                    <div className="linea"></div>
                    <LocalesCards/>
                    <h1>Negocios</h1>
                    <LocalesCards/>
                    <h1>¿Buscas de lo siempre?</h1>
                    <LocalesCards/>
                    <h1>Localización</h1>
                   
                   
            </div>
            <div className="contenedorFooter">
              <div className="textoFooter2">
                Copyright © 2024 Too Good To Go International. All Rights Reserved.
              </div>
            </div>
        </div>

    
    );
    
    
  }
  
  export default HomeCliente;