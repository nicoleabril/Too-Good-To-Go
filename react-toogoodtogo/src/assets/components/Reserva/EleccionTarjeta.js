import React from 'react';
import Visa from '../../images/visa.png';
import MasterCard from '../../images/mastercard.png';
import Paypal from '../../images/paypal.png';
import PagoEfectivo from '../../images/pagoEfectivo.png';





function EleccionTarjeta() {
    return (
        <div className='cont-EleccionTarjeta'>
            <button className='btn_EleccionTarjeta'><img src={Visa} alt='Visa' className='imgTarjeta' /></button>
            <button className='btn_EleccionTarjeta'><img src={MasterCard} alt='MasterCard' className='imgTarjeta' /></button>
            <button className='btn_EleccionTarjeta'><img src={Paypal} alt='Paypal' className='imgTarjeta' /></button>
            <button className='btn_EleccionTarjeta'><img src={PagoEfectivo} alt='PagoEfectivo' className='imgTarjeta' /></button>
        </div>
    );
}
export default EleccionTarjeta;