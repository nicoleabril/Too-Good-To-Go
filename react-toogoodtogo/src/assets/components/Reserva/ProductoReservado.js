import React, { useState, useEffect } from 'react';
import '../../styles/paginadeReserva.css';
import { CgChevronUpO } from "react-icons/cg";
import { CgChevronDownO } from "react-icons/cg";
import { getProductosComprados } from '../productosComprados';

function ProductoReservado() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const productosComprados = getProductosComprados();
        console.log('Productos obtenidos al publicar:', productosComprados);
        setProductos(productosComprados);
    }, []); // Asegúrate de que el segundo argumento sea un array vacío para que se ejecute solo una vez

    const handleIncrement = (index) => {
        const newProductos = [...productos];
        newProductos[index].cantidad = (newProductos[index].cantidad || 1) + 1;
        setProductos(newProductos);
    };

    const handleDecrement = (index) => {
        const newProductos = [...productos];
        if (newProductos[index].cantidad > 1) {
            newProductos[index].cantidad -= 1;
        }
        setProductos(newProductos);
    };

    return (
        <>
            {productos.map((producto, index) => (
                <div key={index} className='productoReservado'>
                    <img src={producto.image} alt='Imagen del producto' className='imgProductoReservado' />
                    <p className='nombreProductoReservado'>{producto.name}</p>
                    <p className='descripcionProductoReservado'>{producto.descript}</p>
                    <p className='precioProductoReservado'>$ {producto.precio}</p>
                    <div className='cantidadProductoReservado'>
                        <button className='btn_modificaCantidad' onClick={() => handleIncrement(index)} >  <CgChevronUpO /></button>
                        <p id='cantidad_' className='texto_cantidad'>{producto.cantidad || 1}</p>
                        <button className='btn_modificaCantidad' onClick={() => handleDecrement(index)} >  <CgChevronDownO /></button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ProductoReservado;
