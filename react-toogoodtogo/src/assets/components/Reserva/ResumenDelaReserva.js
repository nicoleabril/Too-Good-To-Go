import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import ProductoReservado from './ProductoReservado';
import '../../styles/paginadeReserva.css';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";




function ResumenDelaReserva({ productos, onIncrement, onDecrement }) {
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
                
                    <ProductoReservado
                    />
                
            </Collapsible>
        </>
    );
}
export default ResumenDelaReserva;