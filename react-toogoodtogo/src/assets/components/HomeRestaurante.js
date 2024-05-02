import React from 'react';
import '../styles/cliente.css'
import donas from '../images/donas.png'
//import dunkin_logo from '../images/dunkin_donuts_logo.jpeg'
import bolsa from '../images/bolsa.jpeg'
import combo1 from '../images/combo1.jpeg'
import combo2 from '../images/combo2.jpeg'
import combo3 from '../images/combo3.jpeg'
import bebida1 from '../images/bebida1.jpeg'
import bebida2 from '../images/bebida2.jpeg'
import bebida3 from '../images/bebida3.jpeg'
import sanduche1 from '../images/sanduche1.jpeg'
import sanduche2 from '../images/sanduche2.jpeg'
import sanduche3 from '../images/sanduche3.jpeg'
import ProductosCards from './ProductoCards';
function HomeRestaurante() {
  const ofertasData = [
        {
          precio: '6.99',
          name: 'Oferta #1',
          descript: 'Esta bolsa sorpresa está valorada en $11,99',
          image: bolsa,
        },
        {
          precio: '4.99',
          name: 'Oferta #2',
          descript: 'Esta bolsa sorpresa está valorada en $7,99',
          image: bolsa,
        },
        {
          precio: '9.99',
          name: 'Oferta #3',
          descript: 'Esta bolsa sorpresa está valorada en $31,99',
          image: bolsa,
        }
  ];
  const combosData = [
      {
        precio: '25.99',
        name: 'Oferta #1',
        descript: '¡Disfruta de las donuts más famosas del mundo! Elige tus 12 donas favoritas.',
        image: combo1,
      },
      {
        precio: '17.99',
        name: 'Oferta #2',
        descript: 'Desayuno para cuatro, incluye: 4 Cubanitos a elección + 1 Party Box + 4 Té helados Medianos.',
        image: combo2,
      },
      {
        precio: '20.99',
        name: 'Oferta #3',
        descript: 'Elige tus 50 antojitos favoritos y disfruta de una variedad de sabores únicos.',
        image: combo3,
      }
  ];
  const bebidasData = [
    {
      precio: '1.50',
      name: 'Té Helado Grande',
      descript: 'Despierta tus sentidos y réfrescate con nuestro famosos Té Helado Dunkin',
      image: bebida1,
    },
    {
      precio: '3.50',
      name: 'Iced Latte',
      descript: 'Despierta tus sentidos y refréscate con nuestro famoso Iced Latte Dunkin.',
      image: bebida2,
    },
    {
      precio: '3.75',
      name: 'Chocolate Frío',
      descript: 'La combinación ideal de frío y dulzura de nuestro chocolate Dunkin.',
      image: bebida3,
    }
  ];
  const sanduchesData = [
    {
      precio: '1.99',
      name: 'Cubanitos',
      descript: 'Sánduche de pan flauta. ',
      image: sanduche1,
    },
    {
      precio: '2.99',
      name: 'Donut Sandwich',
      descript: 'Sánduche de donut glaseada con huevo, queso y tocino.',
      image: sanduche2,
    },
    {
      precio: '2.99',
      name: 'Croissant de Jamón y Queso.',
      descript: 'Croissant de Jamón y Queso.',
      image: sanduche3,
    }
  ];
  
    return (
    
        <div>
            
            <div className='textoImagen'>
            <p className='subtexto'>Dunkin' Donuts ofrece una amplia variedad de productos,</p>
            <p className='subtexto'>incluyendo donas, café, bebidas frías y calientes, sándwiches</p>
            <p className='subtexto'>de desayuno, bagels, muffins y otros productos de panadería.</p>
            </div>
            <div className="imagenPizza">
            <img src={donas} alt="Pizza" className="imagen2" />
            </div>
            <div className="waves-background2"></div>
            <div className="contenedorRojo">
            </div>
            <div className="contenedorBlanco">
                    <h1>OFERTAS</h1>
                    <div className="linea"></div>
                    <ProductosCards productos={ofertasData}/>
                    <h1>Combos</h1>
                    <ProductosCards productos={combosData}/>
                    <h1>Bebidas</h1>
                    <ProductosCards productos={bebidasData}/>
                    <h1>Sánduches</h1>
                    <ProductosCards productos={sanduchesData}/>                   
                   
            </div>
            <div className="contenedorFooter">
              <div className="textoFooter2">
                Copyright © 2024 Too Good To Go International. All Rights Reserved.
              </div>
            </div>
        </div>

    
    );
    
    
  }
  
  export default HomeRestaurante;