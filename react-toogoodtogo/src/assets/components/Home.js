import React from 'react';
import '../styles/bienvenida.css'
//import dunkin_logo from '../images/dunkin_donuts_logo.jpeg'
import bolsa from '../images/we-are-open.png'
function Home() {

  
    return (
    
        <div>
            <div className='textoImagen'>
            <h1 className='texto1'>Too Good</h1>
            <h1 className='texto2'>To Go</h1>
            <p className='subtexto'>Dunkin' Donuts ofrece una amplia variedad de productos,</p>
            <p className='subtexto'>incluyendo donas, café, bebidas frías y calientes, sándwiches</p>
            <p className='subtexto'>de desayuno, bagels, muffins y otros productos de panadería.</p>
            </div>
            <div className="imagenPizza">
            <img src={bolsa} alt="Pizza" className="imagen2" />
            </div>
            <div className="waves-background2"></div>
            <div className="contenedorRojo">
            </div>
            <div className="contenedorBlanco">
                    <h1>OFERTAS</h1>
                    <div className="linea"></div>
                                  
                   
            </div>
            <div className="contenedorFooter">
              <div className="textoFooter2">
                Copyright © 2024 Too Good To Go International. All Rights Reserved.
              </div>
            </div>
        </div>

    
    );
    
    
  }
  
  export default Home;