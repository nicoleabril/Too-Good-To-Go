import React from 'react';
import '../../styles/paginadeReserva.css';

function ProductoReservado(props) {
    return (
        <>
        <div className='productoReservado'>
            <img src={props.imgProducto} alt='Imagen del producto' className='imgProductoReservado'/>
            <p className='nombreProductoReservado'>{props.nombreProducto}</p>
            <p className='descripcionProductoReservado'>{props.descripcionProducto}</p>
            <p className='precioProductoReservado'>$ {props.precioProducto}</p>
            <p className='cantidadProductoReservado'>{props.cantidad}</p>
        </div>
        </>
    );
}
export default ProductoReservado;