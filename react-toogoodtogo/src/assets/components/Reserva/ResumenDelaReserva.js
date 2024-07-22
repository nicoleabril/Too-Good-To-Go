import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import ProductoReservado from './ProductoReservado';
import '../../styles/paginadeReserva.css';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

function ResumenDelaReserva({ productos, onIncrement, onDecrement, onRemove, cantidades }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleTriggerClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Collapsible
                open={true}
                trigger={
                    <div className="triggerContent" onClick={handleTriggerClick}>
                        <span>Resumen de los pedidos</span>
                        <button className="triggerButton" >
                            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                        </button>
                    </div>
                }
                className='tittleToggleSection'
            >
                {productos.map((producto, index) => {
               
                    if (!producto) {
                        console.error('Producto inválido:', producto);
                        return null;
                    }

                    return (
                        <ProductoReservado
                            key={index}
                            imgProducto={producto.imagen_oferta || producto.imagen}
                            nombreProducto={producto.nombre_oferta || producto.nombre_producto}
                            descripcionProducto={producto.descripcion}
                            precioProducto={producto.precio}
                            cantidad={cantidades[producto.id_oferta || producto.id_producto] || 1}
                            onIncrement={() => onIncrement(producto.id_oferta || producto.id_producto)}
                            onDecrement={() => onDecrement(producto.id_oferta || producto.id_producto)}
                            onRemove={() => onRemove(producto.id_oferta || producto.id_producto)}
                        />
                    );
                })}
            </Collapsible>
        </>
    );
}

export default ResumenDelaReserva;
