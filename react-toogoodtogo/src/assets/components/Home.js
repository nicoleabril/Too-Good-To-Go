import React from 'react';
import '../styles/informativa.css'
//import dunkin_logo from '../images/dunkin_donuts_logo.jpeg'
import bolsa from '../images/we-are-open.png'
import bolsa2 from '../images/bolsa2.jpg'
import bolsa3 from '../images/bolsa3.jpg'
import bolsa4 from '../images/bolsa4.jpg'
import cliente from '../images/cliente.jpg'
import negocio from '../images/negocio.jpg'
import perfilMujer from '../images/perfilMujer.jpg'
import ServicioCards from './ServicioCards';
function Home() {
  const ofertasData = [
    {
      name: 'Clientes',
      descript: 'Acceso a ofertas exclusivas. Apoyo a la sostenibilidad. Variedad de opciones. Ahorro de dinero.',
      image: cliente,
    },
    {
      name: 'Negocios',
      descript: 'Reducción de desperdicio de alimentos. Conexión con la comunidad. Incremento de ingresos.',
      image: negocio,
    },
];
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
                  <div className='seccionMensaje'>
                    <div className='seccionImagen'>
                      <img src={bolsa2} alt="Bolsa 1" className="imagenSecundaria" />
                      <img src={bolsa3} alt="Bolsa 2" className="imagenPrimaria" />
                      <img src={bolsa4} alt="Bolsa 3" className="imagenSecundaria" />
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
                <h1>Nuestros Servicios</h1>
                <div className="linea"></div>     
                <ServicioCards productos={ofertasData} nombreBoton={'SER PARTE'}/>  
                <h1>¿Cómo funciona el proceso de compra  para un cliente?</h1>
                <div className="linea"></div>     
                <div className='seccionIniciativa'>
                  <div className='seccionMensaje'>
                    <div className='seccionImagen'>
                      <img src={bolsa2} alt="Bolsa 1" className="imagenSecundaria" />
                      <img src={bolsa3} alt="Bolsa 2" className="imagenPrimaria" />
                      <img src={bolsa4} alt="Bolsa 3" className="imagenSecundaria" />
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
                <div class="contenedorSlide">
                    <div id="cliente" class="cuadroTexto">
                        <h2>Información del Cliente</h2>
                        <p>Texto que explica cosas sobre el cliente...</p>
                    </div>
                    <div id="negocio" class="cuadroTexto oculto">
                        <h2>Información del Negocio</h2>
                        <p>Texto que explica cosas sobre el negocio...</p>
                    </div>
                    <div class="controles">
                        <label for="cliente-dot" class="dot" onclick>p</label>
                        <label for="negocio-dot" class="dot" onclick>p</label>
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