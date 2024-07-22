import React from 'react';
import '../../styles/paginadeReserva.css';
import { FaTrash } from 'react-icons/fa';
import { CgChevronUpO } from "react-icons/cg";
import { CgChevronDownO } from "react-icons/cg";


function ProductoReservado(props) {
    return (
        <>
            <div className='productoReservado'>
                <img src={props.imgProducto} alt='Imagen del producto' className='imgProductoReservado' />
                <p className='nombreProductoReservado'>{props.nombreProducto}</p>
                <p className='descripcionProductoReservado'>{props.descripcionProducto}</p>
                <p className='precioProductoReservado'>$ {props.precioProducto}</p>
                <div className='cantidadProductoReservado'>
                    <button className='btn_modificaCantidad'onClick={props.onIncrement} >  <CgChevronUpO /></button>
                    <p id='cantidad_' className='texto_cantidad'>{props.cantidad}</p>
                    <button className='btn_modificaCantidad'onClick={props.onDecrement} >  <CgChevronDownO /></button>
                </div>
                <div className='borrarProductoReservado'>
                    <button className='remove-button' onClick={props.onRemove}><FaTrash /></button>
                </div>
            </div>
        </>
    );
}
export default ProductoReservado;