import React, { useState } from 'react';
import { PiHamburgerBold } from "react-icons/pi";
import { AiOutlineShopping } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import Cookies from 'js-cookie';
import '../styles/header.css'
const Header = ({page}) => {
  const [showMenu, setShowMenu] = useState(false);
  const rol = Cookies.get('rol');
  const handleToggleMenu = () => {
      setShowMenu(!showMenu);
  };

  const handleLogOut = () => {
    Cookies.remove('authToken');
    Cookies.remove('usr');
    Cookies.remove('rol');
    window.location.href = '/';
  };
  return (
    <nav>
        {rol === 'Cliente' && (
            <a href='/Inicio' className='logo'><PiHamburgerBold className='iconLogo'/>Too Good To Go</a>
        )}
        {rol === 'Negocio' && (
            <a href='/Inicio-Negocio' className='logo'><PiHamburgerBold className='iconLogo'/>Too Good To Go</a>
        )}
        {rol !== 'Negocio' && rol !== 'Cliente' &&  (
            <a href='/' className='logo'><PiHamburgerBold className='iconLogo'/>Too Good To Go</a>
        )}
        <input type="checkbox" id="menuToggle" checked={showMenu} onChange={handleToggleMenu} />
        <label htmlFor="menuToggle" className="icon">
            <FaBars className='iconMenu'/>
        </label>
        <div className={`menu ${showMenu ? 'show' : ''}`}>
            <ul>
                {rol === 'Cliente' && (
                    <React.Fragment>
                        <li><a href="/Inicio">Inicio</a></li>
                        <li><a href="/Inicio">Comentarios</a></li>
                        <li><a href="/Inicio">Mi Perfil</a></li>
                        <li><button className='buttonIniciarSesion' onClick={handleLogOut}>Cerrar Sesión</button></li>
                    </React.Fragment>
                )}
                {rol === 'Negocio' && (
                    <React.Fragment>
                        <li><a href="/Inicio-Negocio">Inicio</a></li>
                        <li><a href="/Negocio">Negocio</a></li>
                        <li><a href="/RegistroCategoria">Categorías</a></li>
                        <li><a href="/RegistroProductos">Productos</a></li>
                        <li><a href="/Inicio">Ofertas</a></li>
                        <li><a href="/Inicio">Reservas</a></li>
                        <li><button className='buttonIniciarSesion' onClick={handleLogOut}>Cerrar Sesión</button></li>
                    </React.Fragment>
                )}
                {page === 'Informativa' && (
                    <React.Fragment>
                        <li><a href="/Registro"><button className='buttonRegistrarse'>Registrarse</button></a></li>
                        <li><a href="/Login"><button className='buttonIniciarSesion'>Iniciar Sesión</button></a></li>
                    </React.Fragment>
                )}
                
            </ul>
        </div>
        {page !== 'RegistroProductos' && page !=='Informativa' && page !== 'AgregarProducto' && page !== 'RegistroCategoria' &&
        page !== 'AgregarCategoria' && page !== 'EditarCategoria' && page !== 'EditarProducto' && rol !== 'Negocio' && 
         (
            <a href='/' className='logo'><AiOutlineShopping className='iconOrders'/></a>
        )}
       
    </nav>
   
);
};

export default Header;
