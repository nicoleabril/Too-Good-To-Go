import React from 'react';
import Collapsible from 'react-collapsible';
import ProductoReservado from './ProductoReservado';
import datosProductosComprados from '../../components/Reserva/datosProductosComprados';
import '../../styles/paginadeReserva.css';



function ResumenDelaReserva(props) {
    let cantidad = 1;
    return (
        <>
       
        <Collapsible trigger="Resumen de los pedidos" className='tittleToggleSection'   >
            
        {/*Vamos a crear un componente por cada producto que se encuentre en datosProductosComprados */}
        {datosProductosComprados.products.map((producto,index)=>{
            return <ProductoReservado
            key={index} // Agrega una clave única para cada componente en el mapeo
            imgProducto={producto.imgProducto}
            nombreProducto={producto.nombrePromocion}
            descripcionProducto={producto.descripcion}
            precioProducto={producto.precio}
            cantidad={cantidad} // Pasa la cantidad como un prop
        />;
        })}

        </Collapsible>
        </>
    );
}
export default ResumenDelaReserva;