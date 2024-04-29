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
                    <h1>Ofertas</h1>
                    <LocalesCards/>
                </div>
        </div>

    
    );
    
    
  }
  
  export default HomeCliente;