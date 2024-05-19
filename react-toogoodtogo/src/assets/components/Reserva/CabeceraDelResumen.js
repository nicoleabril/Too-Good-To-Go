import { PiHamburgerBold } from "react-icons/pi";
import React from 'react';
import '../../styles/paginadeReserva.css';

function CabeceraDelResumen(props) {
    return (
        <>
        <p className="logoTooGoodToGo">Too Good To Go<PiHamburgerBold className='iconLogo' /></p>
        <p className="nombreRestaurante"> La Panaderia </p>
        </> 
    );
}
export default CabeceraDelResumen;