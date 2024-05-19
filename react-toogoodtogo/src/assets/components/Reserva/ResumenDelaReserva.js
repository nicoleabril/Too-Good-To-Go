import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import ProductoReservado from './ProductoReservado';
import datosProductosComprados from '../../components/Reserva/datosProductosComprados';
import '../../styles/paginadeReserva.css';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";




function ResumenDelaReserva(props) {
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
                className="tittleToggleSection"
                open={isOpen}
                onOpening={() => setIsOpen(true)}
                onClosing={() => setIsOpen(false)}
            >
                {/* Crear un componente por cada producto en datosProductosComprados */}
                {datosProductosComprados.products.map((producto, index) => (
                    <ProductoReservado
                        key={index} // Agrega una clave única para cada componente en el mapeo
                        imgProducto={producto.imgProducto}
                        nombreProducto={producto.nombrePromocion}
                        descripcionProducto={producto.descripcion}
                        precioProducto={producto.precio}
                        cantidad={1} // Pasa la cantidad como un prop
                    />
                ))}
            </Collapsible>
        </>
    );
}
export default ResumenDelaReserva;