import React from 'react';
import { Card } from 'react-bootstrap';

function Cards_Reservas({ id, nombreCliente,celular, metodoPago, pedido, horaMinima, horaMaxima, onConfirm, onCancel, onRealizado, onEntregado, soloVista }) {
    const estadoClase = {
        Cancelado: 'btn-cancelado',
        'En Proceso': 'btn-proceso',
        Finalizado: 'btn-finalizado',
        Realizado: 'btn-realizado',
        Pendiente: 'btn-pendiente'
      };
    
      const estadoTexto = {
        Cancelado: 'Cancelado',
        'En Proceso': "En Proceso",
        Finalizado: 'Entregado',
        Realizado: 'Listo para Entregar',
        Pendiente: 'Pendiente'
    };
    
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
                    <h5 className="card-title">Hora Mínima:</h5>
                    <p className="card-text">{horaMinima}</p>
                    <h5 className="card-title">Hora Máxima:</h5>
                    <p className="card-text">{horaMaxima}</p>
                    {onConfirm && (
                        <button id="btn_ConfirmarReserva" onClick={() => onConfirm(id)}>Confirmar Reserva</button>
                    )}
                    {onEntregado && (
                        <button id="btn_EntregarReserva" onClick={() => onEntregado(id)}>
                            Reserva Entregada
                        </button>
                    )}
                    {onRealizado && (
                        <button id="btn_RealizarReserva" onClick={() => onRealizado(id)}>
                            Listo para Entregar
                        </button>
                    )}
                    {onCancel && (
                        <button id="btn_CancelarReserva" onClick={() => onCancel(id)}>
                            Cancelar Reserva
                        </button>
                    )}
                    {soloVista && (
                        <div id="contenedor_boton_estado">
                            <div className={`estado ${estadoClase[soloVista]}`}>
                                {estadoTexto[soloVista]}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default Cards_Reservas;
