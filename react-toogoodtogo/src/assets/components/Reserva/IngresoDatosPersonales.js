import React from 'react';
import Label_Input from './Label_Input';
import EleccionTarjeta from './EleccionTarjeta';

function IngresoDatosPersonales({ onPaymentMethodSelect }) {
    return (
        <div className='contenedorDatosPersonales'>
            <h3 className='texto_DetallesReserva'>Información Personal</h3>
            <form className='formularioDatosPersonales'>
                <Label_Input id='nombresIngresado' atributo='Nombres' tipo='text' textDefault="Ingresa tus nombres..." />
                <Label_Input id='apellidosIngresados' atributo='Apellidos' tipo='text' textDefault='Ingresa tus apellidos...' />
                <Label_Input id='correoIngresado' atributo='Correo Electrónico' tipo='email' textDefault='Ingresa tu correo electrónico...' />
                <Label_Input id='telefonoIngresado' atributo='Teléfono' tipo='number' textDefault='0000000000' />
            </form>
            <h3 className='texto_DetallesReserva'>Detalles del pago</h3>
            <EleccionTarjeta onPaymentMethodSelect={onPaymentMethodSelect} />
            <form className='formularioDatosPago'>
                <Label_Input id='nombreTitularTarjetaIngresado' atributo='Nombre del titular de la tarjeta' tipo='text' textDefault='Nombre del titular...' />
                <Label_Input id='numeroTarjetaIngresado' atributo='Número de la tarjeta' tipo='number' textDefault='0000 0000 ' />
                <Label_Input id='codigoSeguridadIngresado' atributo='Código de seguridad' tipo='number' textDefault='000' />
                <Label_Input id='fechaExpiracionIngresada' atributo='Fecha de expiración' tipo='text' textDefault='MM/AA' />
            </form>
        </div>
    );
}

export default IngresoDatosPersonales;
