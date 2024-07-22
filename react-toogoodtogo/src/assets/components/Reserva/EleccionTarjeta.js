import React, { useState } from 'react';
import Visa from '../../images/visa.png';
import MasterCard from '../../images/mastercard.png';
import Paypal from '../../images/paypal.png';
import PagoEfectivo from '../../images/pagoEfectivo.png';

function EleccionTarjeta({ onPaymentMethodSelect }) {
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
        onPaymentMethodSelect(buttonId);
    };

    return (
        <div className='cont-EleccionTarjeta'>
            <button
                className={`btn_EleccionTarjeta ${activeButton === 'visa' ? 'active' : ''}`}
                onClick={() => handleButtonClick('visa')}
            >
                <img src={Visa} alt='Visa' className='imgTarjeta' />
            </button>
            <button
                className={`btn_EleccionTarjeta ${activeButton === 'mastercard' ? 'active' : ''}`}
                onClick={() => handleButtonClick('mastercard')}
            >
                <img src={MasterCard} alt='MasterCard' className='imgTarjeta' />
            </button>
            <a href='https://www.paypal.com/paypalme/TooGoodtoGoo'><button
                className={`btn_EleccionTarjeta ${activeButton === 'paypal' ? 'active' : ''}`}
                onClick={() => handleButtonClick('paypal')}
            >
                <img src={Paypal} alt='Paypal' className='imgTarjeta' />
            </button></a>
            <button
                className={`btn_EleccionTarjeta ${activeButton === 'pagoEfectivo' ? 'active' : ''}`}
                onClick={() => handleButtonClick('pagoEfectivo')}
            >
                <img src={PagoEfectivo} alt='PagoEfectivo' className='imgTarjeta' />
            </button>
        </div>
    );
}

export default EleccionTarjeta;
