import React from 'react';
import { Card } from 'react-bootstrap';

function Cards_Reservas({ id,nombreCliente,metodoPago,pedido,horaReserva }) {
    return (

        <>
            <div class="card text-center">
                <div class="card-header">
                    Número de Reserva: {id}  
                </div>
                <div class="card-body">
                <h5 class="card-title">Cliente:</h5>
                    <p class="card-title">{nombreCliente}</p>
                    <h5 class="card-title">El método de pago fue:</h5>
                    <p class="card-text"> {metodoPago}</p>
                    <h5 class="card-title">Pedido:</h5>
                    <p class="card-text">{pedido}</p>
                    <h5 class="card-title">Hora de Reserva:</h5>
                    <p class="card-text">{horaReserva}</p>
                    <button id="btn_ConfirmarReserva" > Confirmar Reserva</button>
                    <button id="btn_CancelarReserva" > Cancelar Reserva</button>

                </div>
                
            </div>
        </>
    );
}
export default Cards_Reservas;