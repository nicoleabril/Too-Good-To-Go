import React, { useState } from 'react';
import '../styles/restaurante.css'
import donas from '../images/donas.png'
import dunkin_logo from '../images/dunkin_donuts_logo.jpeg'
import DashboardCards from './DashboardCard';
import StatisticsCards from './StatisticsCard';
import GraficaCard from './GraficaCard';
import bebida3 from '../images/bebida3.jpeg'
import sanduche1 from '../images/sanduche1.jpeg'
import sanduche2 from '../images/sanduche2.jpeg'
import sanduche3 from '../images/sanduche3.jpeg'
import ProductosCards from './ProductoCards';
import perfilMujer from '../images/perfilMujer.jpg'
import { GrGroup } from "react-icons/gr";
import { IoReceipt } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
function HomeNegocio() {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const ordenesPopulares = [
    {
      precio: '3.75',
      name: 'Chocolate Frío',
      descript: 'La combinación ideal de frío y dulzura de nuestro chocolate Dunkin.',
      image: bebida3,
    },
    {
        precio: '1.99',
        name: 'Cubanitos',
        descript: 'Sánduche de pan flauta con jamón y queso. ',
        image: sanduche1,
    },
    {
        precio: '2.99',
        name: 'Croissant de Jamón y Queso.',
        descript: 'Croissant de Jamón y Queso.',
        image: sanduche3,
    }
  ];

  const masVendidos = [
    {
      sales: '| 240 ventas',
      name: 'Chocolate Frío',
      descript: '4.5⭐',
      image: bebida3,
    },
    {
        sales: '| 100 ventas',
        name: 'Cubanitos',
        descript: '3.9⭐ ',
        image: sanduche1,
    },
  ];

  const datosEstadisticos = [
    {
      name: 'Nuevos Clientes',
      number: '24',
      icon: <GrGroup size={30}/>,
    },
    {
        name: 'Total Ordenado',
        number: '186',
        icon: <IoReceipt size={30}/>,
    },
    {
      name: 'Total Ingreso',
      number: '$ 240',
      icon: <FaMoneyBillWave size={30}/>,
  },
  ];


    return (
    
        <div className="RestauranteContainer">
            <div className='textoImagen'>
              <img src={dunkin_logo} alt="Pizza" className="imagenLogo"/>
              <div className='textoRestaurante'>
                <p className='subtexto'>Dunkin' Donuts ofrece una amplia variedad de productos, incluyendo donas, café, bebidas frías y calientes, sándwiches de desayuno, bagels, muffins y otros productos de panadería.</p>
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
                        <p>Excelente! Las donas me encantaron 10/10. Lo volveré a pedir.</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="imagenPizza">
            <img src={donas} alt="Pizza" className="imagen2" />
            </div>
            <div className="waves-background2"></div>
            <div className="contenedorRojo">
            </div>
            <div className="contenedorBlanco">
                    <h1>ÓRDENES POPULARES</h1>
                    <div className="linea"></div>
                    <ProductosCards productos={ordenesPopulares} nombreBoton={'EDITAR AHORA'}/>
                    <div className='titulosDashboard'>
                      <h1 class="inline" >Más Vendidos</h1> 
                      <h1 class="inline">Estadísticas</h1> 
                    </div>
                    <div className='componentesDashboard'>
                      <DashboardCards platos={masVendidos} /> 
                      <div className='seccionEstadistica'>
                        <StatisticsCards datos={datosEstadisticos} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/> 
                        {selectedIndex !== null && <GraficaCard datos={selectedIndex} />}
                      </div>
                    </div>
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
  
  export default HomeNegocio;