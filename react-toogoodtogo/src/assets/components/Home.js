import React, { useState, useEffect } from "react";
import '../styles/informativa.css'
//import dunkin_logo from '../images/dunkin_donuts_logo.jpeg'
import bolsa from '../images/we-are-open.png'
import bolsa2 from '../images/bolsa2.jpg'
import bolsa3 from '../images/bolsa3.jpg'
import bolsa4 from '../images/bolsa4.jpg'
import cliente from '../images/cliente.jpg'
import negocio from '../images/negocio.jpg'
import perfilMujer from '../images/perfilMujer.jpg'
import dosnegocios from '../images/dosnegocios.jpg'
import entregando from '../images/entregando.jpg'
import ServicioCards from './ServicioCards';
import Cookies from 'js-cookie';
function Home() {
  const [currentSlide, setCurrentSlide] = useState('cliente');
  const rol = Cookies.get('rol');
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide === 'cliente' ? 'negocio' : 'cliente');
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const ofertasData = [
    {
      name: 'Clientes',
      descript: 'Acceso a ofertas exclusivas. Apoyo a la sostenibilidad. Variedad de opciones. Ahorro de dinero.',
      image: cliente,
      link: 'Registro-Cliente'
    },
    {
      name: 'Negocios',
      descript: 'Reducción de desperdicio de alimentos. Conexión con la comunidad. Incremento de ingresos.',
      image: negocio,
      link: 'Registro-Negocio'
    },
];
    return (
        <div className="HomeContainer">
            <div className='textoImagen'>
              <h1 className='textoTooGood'>Too Good</h1>
              <h1 className='textoToGo'>To Go</h1>
              <div className='textoInformativo'>
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
                <div className="cardsInformativa">
                  <ServicioCards productos={ofertasData} nombreBoton={'SER PARTE'}/>  
                </div>   
                <div className="linea"></div>     
                <div className="contenedorSlide">
                  <div id="cliente" className={`cuadroTexto ${currentSlide === 'cliente' ? '' : 'oculto'}`}>
                    <div className='tituloCuadroTexto'>
                      <h1>¿Cómo funciona el proceso de compra</h1>
                      <h1 style={{ color: '#B01818' }}>para un cliente?</h1>
                    </div>
                    <div className='contenedorLista'>
                      <ul className="custom-list">
                        <li>El usuario se registra como cliente en la página web para acceder a las promociones y ofertas disponibles.</li>
                        <li>El cliente explora las promociones disponibles en la página web. La plataforma facilita el registro de la dirección, lo que le permite visualizar los restaurantes cercanos y las ofertas disponibles en cada uno de ellos.</li>
                        <li>El cliente elige el restaurante de su agrado entre las opciones disponibles.</li>
                        <li>En el perfil de cada restaurante, el cliente encuentra una variedad de fundas sorpresa que contienen una selección de alimentos a un precio reducido.</li>
                        <li>El cliente selecciona la funda sorpresa que desea y reserva su pedido a través de la plataforma para que el restaurante pueda apartarlo.</li>
                        <li>Una vez confirmada la reserva, el cliente recibe un correo electrónico de confirmación con los detalles del pedido y el horario en el cual debe recogerlo en el restaurante.</li>
                      </ul>
                      <img src={entregando} alt="Entregando" className="imagenProceso" />
                    </div>
                  </div>
                  <div id="negocio" className={`cuadroTexto ${currentSlide === 'negocio' ? '' : 'oculto'}`}>
                    <div className='tituloCuadroTexto'>
                      <h1>¿Cómo funciona el proceso de reserva</h1>
                      <h1 style={{ color: '#B01818' }}>para un negocio?</h1>
                    </div>
                    <div  className='contenedorLista'>
                      <ul className="custom-list">
                        <li>Regístrate como negocio proporcionando la información requerida.</li>
                        <li>Agrega los productos disponibles en tu establecimiento a través de un formulario en la plataforma.</li>
                        <li>Utiliza la función de gestión de categorías para organizar tus productos de manera efectiva y facilitar la navegación de los clientes.</li>
                        <li>Crea ofertas especiales para atraer a los clientes, proporcionando detalles sobre la disponibilidad y el precio reducido.</li>
                        <li>Una vez que los clientes reserven sus pedidos a través de la plataforma, recibirás una notificación y podrás preparar los productos para su recogida.</li>
                        <li>Confirma cada pedido realizado por los clientes a través de la plataforma y proporciona información sobre el horario de recogida.</li>
                      </ul>
                      <img src={dosnegocios} alt="Negocios" className="imagenProceso" />
                    </div>
                  </div>
                  <div className="controles">
                    <input type="radio" id="cliente-dot" name="dot" className="dot-radio" checked={currentSlide === 'cliente'} />
                    <label htmlFor="cliente-dot" className="dot" onClick={() => setCurrentSlide('cliente')}></label>
                    <input type="radio" id="negocio-dot" name="dot" className="dot-radio" checked={currentSlide === 'negocio'} />
                    <label htmlFor="negocio-dot" className="dot" onClick={() => setCurrentSlide('negocio')}></label>
                  </div>
                </div>
                <h1>Recoge tu Pedido</h1>
                <div className="linea"></div>
                <div className='seccionPedido'>
                  <div id="reservaConfirmada">
                    <h1 style={{ color: '#B01818' }}>¿Qué hacer una vez que el restaurante a confirmado la reserva?</h1>
                    <ul>
                      <li>Después de confirmar tu reserva, recibirás un correo electrónico de confirmación para mantenerte al tanto de tu pedido y con el horario en que puedes recogerlo.</li>
                      <li>Es importante recoger tu pedido dentro del horario indicado para evitar que se cancele automáticamente.</li>
                      <li>Después de recoger tu pedido, podrás calificar el producto y dejar comentarios para compartir tu experiencia con otros usuarios.</li>
                    </ul>
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