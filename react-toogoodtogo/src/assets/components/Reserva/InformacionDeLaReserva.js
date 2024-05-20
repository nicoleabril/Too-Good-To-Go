import React from 'react';

function InformacionDeLaReserva({metodoPago, estado, restaurante, direccion, horario}) {
    return (
        <>
        <h3 className='texto_DetallesReserva'>Detalles de la reserva</h3>
        <div className='cont-DetallesDePago'>
        
        <p className='texto_InformacionReserva'>Método de Pago:</p>
        <label className='label_InformacionReserva'>{metodoPago}</label>
        <p className='texto_InformacionReserva'>Estado:</p>
        <label className='label_InformacionReserva'>{estado}</label>
        <p className='texto_InformacionReserva'>Restaurante:</p>
        <label className='label_InformacionReserva'>{restaurante}</label>
        <p className='texto_InformacionReserva'>Dirección:</p>
        <label className='label_InformacionReserva'>{direccion}</label>
        <p className='texto_InformacionReserva'>Horario:</p>
        <label className='label_InformacionReserva'>{horario}</label>        

        </div>
        </>
    );
}
export default InformacionDeLaReserva;