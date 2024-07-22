import React from 'react';
import '../../styles/paginadeReserva.css';
import { PiHamburgerBold } from "react-icons/pi";

function CabeceraDelResumen({ nombre_negocio }) {
    return (
        <>
            <p className="logoTooGoodToGo">Too Good To Go <PiHamburgerBold className='iconLogo' /></p>
            <p className="nombreRestaurante">{nombre_negocio}</p>
        </> 
    );
}
export default CabeceraDelResumen;
