import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';
import Chatbot from '../assets/components/Chatbot';
import Cards_Reservas from '../assets/components/Reserva/Cards_Reservas';

function ReservacionesRecibidas() {
    return (
        <>
       <div className='cont-principalCardsReserva' >
            <Header page={'Reserva'} />
            <DynamicBreadcrumb />
            <div className='cont-CardsReserva'>
                <Cards_Reservas id='1' nombreCliente='Jose Luis Rivera'  metodoPago='En Efectivo' pedido='Té helado + donas' horaReserva='16:30' />
                <Cards_Reservas id='2' nombreCliente='Maria Fernanda Ríos'  metodoPago='Tarjeta de Crédito' pedido='Caja sorpresa#2' horaReserva='12:00' />
                <Cards_Reservas id='3' nombreCliente='Juan Carlos'  metodoPago='En Efectivo' pedido='Caja sorpresa#1' horaReserva='15:00' />
                <Cards_Reservas id='4' nombreCliente='Luisa Fernanda'  metodoPago='Tarjeta de Crédito' pedido='Té helado + donas' horaReserva='11:00' />
               
            </div>
            <footer className="contenedorFooter-ReservasRecibidas">
                <div className="textoFooter2">
                    Copyright © 2024 Too Good To Go International. All Rights Reserved.
                </div>
            </footer>
            <Chatbot />
        </div>

        </>
    );
}
export default ReservacionesRecibidas;