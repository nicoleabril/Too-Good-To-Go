import React from 'react';

function InformacionDeLaReserva({ metodoPago, estado, restaurante, horario }) {
    return (
        <>
            <h3 className='texto_DetallesReserva'>Detalles de la reserva</h3>
            <div className='cont-DetallesDePago'>
                <div className='detalle-pago'>
                    <p className='texto_InformacionReserva'>Método de Pago:</p>
                    <label className='label_InformacionReserva'>{metodoPago}</label>
                </div>
                <div className='detalle-pago'>
                    <p className='texto_InformacionReserva'>Estado:</p>
                    <label className='label_InformacionReserva'>{estado}</label>
                </div>
                <div className='detalle-pago'>
                    <p className='texto_InformacionReserva'>Restaurante:</p>
                    <label className='label_InformacionReserva'>{restaurante}</label>
                </div>
                <div className='detalle-pago'>
                    <p className='texto_InformacionReserva'>Horario:</p>
                    <label className='label_InformacionReserva'>{horario}</label>
                </div>
            </div>
        </>

    );
}
export default InformacionDeLaReserva;