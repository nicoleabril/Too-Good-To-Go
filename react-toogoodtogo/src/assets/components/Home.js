import React from 'react';
import '../styles/informativa.css'
//import dunkin_logo from '../images/dunkin_donuts_logo.jpeg'
import bolsa from '../images/we-are-open.png'
import perfilMujer from '../images/perfilMujer.jpg'
function Home() {
    return (
        <div>
            <div className='textoImagen'>
              <h1 className='textoTooGood'>Too Good</h1>
              <h1 className='textoToGo'>To Go</h1>
                <div className='textoRestaurante'>
                    <p className='subtexto'>Demuestra que te importa el planeta mientras disfrutas de deliciosas ofertas. ¡Too Good To Go te lo hace posible!</p>
                </div>
                <div class="comentario">
                <div class="cliente">
                    <div className='fotoCliente'>
                      <img src={perfilMujer} alt="Foto del cliente"/>
                    </div>
                    <div className='textoComentario'>
                      <h3>Juliana Abril</h3>
                        ⭐⭐⭐⭐⭐
                      <div class="contenido">
                        <p>¡Too Good To Go ha cambiado mi forma de ver la comida! Ahora disfruto de alimentos deliciosos a precios increíbles mientras contribuyo a reducir el desperdicio.</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="imagenPizza">
            <img src={bolsa} alt="Pizza" className="imagenBolsa" />
            </div>
            <div className="waves-background2"></div>
            <div className="contenedorRojo"></div>
            <div className="contenedorBlanco">
                <h1>Too Good To Go</h1>
                <div className="linea"></div>
                <div className='seccionIniciativa'>
                  <div>
                    <div className='seccionImagen'>
                      <img src={bolsa} alt="Bolsa 1" className="imagenSecundaria" />
                      <img src={bolsa} alt="Bolsa 2" className="imagenPrimaria" />
                      <img src={bolsa} alt="Bolsa 3" className="imagenSecundaria" />
                    </div>
                    <div className='texto-seccionImagen'>
                      <p >¡Tú puedes marcar la diferencia!</p>
                    </div>
                  </div>
                  <div className='seccionTexto'>
                    <h1>INICIATIVA</h1>
                    <div className='textoIniciativa'>
                      <p>En nuestros restaurantes locales, demasiada comida termina en la basura todos los días. Pero creemos que podemos cambiar eso.Para los restaurantes, reducir el desperdicio de alimentos no solo significa ahorrar dinero y mejorar la eficiencia operativa.Para nuestros clientes, participar en Too Good To Go significa disfrutar de deliciosas ofertas a precios reducidos mientras contribuyen a un mundo más sostenible.</p>
                    </div>
                  </div>
                </div>              
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