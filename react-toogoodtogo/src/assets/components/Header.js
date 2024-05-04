import React, { useState } from 'react';
import { PiHamburgerBold } from "react-icons/pi";
import { AiOutlineShopping } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import DynamicBreadcrumb from '../components/Bredcrumb'

import '../styles/header.css'
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
      setShowMenu(!showMenu);
  };
  return (
    <nav>
        <a href='#' className='logo'><PiHamburgerBold className='iconLogo'/>Too Good To Go</a>
        <input type="checkbox" id="menuToggle" checked={showMenu} onChange={handleToggleMenu} />
        <label htmlFor="menuToggle" className="icon">
            <FaBars className='iconMenu'/>
        </label>
        <div className={`menu ${showMenu ? 'show' : ''}`}>
            <ul>
                <li><a href="/Inicio">Inicio</a></li>
                <li><a href="">Negocios</a></li>
                <li><a href="">Reservas</a></li>
                <li><a href="">Mi Perfil</a></li>
            </ul>
        </div>
        <a href='#' className='logo'><AiOutlineShopping  className='iconOrders'/></a>
       
    </nav>
   
);
};

export default Header;
