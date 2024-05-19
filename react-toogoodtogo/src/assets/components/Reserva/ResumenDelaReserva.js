import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import ProductoReservado from './ProductoReservado';
import '../../styles/paginadeReserva.css';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";




function ResumenDelaReserva({ productos, onIncrement, onDecrement }) {
    let cantidad = 1;
    const [isOpen, setIsOpen] = useState(false);

    const handleTriggerClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Collapsible
                trigger={
                    <div className="triggerContent">
                        <span>Resumen de los pedidos</span>
                        <button className="triggerButton" onClick={handleTriggerClick}>
                            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                        </button>
                    </div>
                }
                className='tittleToggleSection'
            >
                {productos.map((producto, index) => (
                    <ProductoReservado
                        key={index}
                        imgProducto={producto.imgProducto}
                        nombreProducto={producto.nombrePromocion}
                        descripcionProducto={producto.descripcion}
                        precioProducto={producto.precio}
                        cantidad={producto.cantidad}
                        onIncrement={() => onIncrement(index)}
                        onDecrement={() => onDecrement(index)}
                    />
                ))}
            </Collapsible>
        </>
    );
}
export default ResumenDelaReserva;