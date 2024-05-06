//CRUD_producto.js
import React from 'react';
import Header from '../assets/components/Header';
import DynamicBreadcrumb from '../assets/components/Bredcrumb';

const CrudProducto = () => {
    return (
        <div>
        <div className='crud-producto-page'>
            <Header page={'RegistroProductos'}/>
            <DynamicBreadcrumb/>
        </div>
        </div>
    );
};

export default CrudProducto;