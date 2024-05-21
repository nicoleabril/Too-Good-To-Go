import React from 'react';
import { Card } from 'react-bootstrap';

function Cards_Reservas({ id, nombreCliente,celular, metodoPago, pedido, horaReserva, onConfirm, onCancel }) {
    return (
        <>
            <div className="card text-center">
                <div className="card-header">
                    Número de Reserva: {id}  
                </div>
                <div className="card-body">
                    <h5 className="card-title">Cliente:</h5>
                    <p className="card-title">{nombreCliente}</p>
                    <h5 className="card-title">Número de Celular:</h5>
                    <p className="card-title">{celular}</p>
                    <h5 className="card-title">El método de pago fue:</h5>
                    <p className="card-text">{metodoPago}</p>
                    <h5 className="card-title">Pedido:</h5>
                    <p className="card-text">{pedido}</p>
                    <h5 className="card-title">Hora de Reserva:</h5>
                    <p className="card-text">{horaReserva}</p>
                    <button id="btn_ConfirmarReserva" onClick={() => onConfirm(id)}>Confirmar Reserva</button>
                    <button id="btn_CancelarReserva" onClick={() => onCancel(id)}>Cancelar Reserva</button>
                </div>
            </div>
        </>
    );
}
export default Cards_Reservas;
