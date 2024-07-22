import React, { useState } from 'react';
import Label_Input from './Label_Input';
import EleccionTarjeta from './EleccionTarjeta';

function IngresoDatosPersonales({ onPaymentMethodSelect, onPersonalInfoSubmit }) {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        telefono: '',
        nombreTitular: '',
        numeroTarjeta: '',
        codigoSeguridad: '',
        fechaExpiracion: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevFormData => {
            const newFormData = { ...prevFormData, [id]: value };
            onPersonalInfoSubmit(newFormData); // Llamar onPersonalInfoSubmit con los datos actualizados
            return newFormData;
        });
    };

    return (
        <div className='contenedorDatosPersonales'>
            <h3 className='texto_DetallesReserva'>Información Personal</h3>
            <form className='formularioDatosPersonales'>
                <Label_Input id='nombres' atributo='Nombres' tipo='text' textDefault="Ingresa tus nombres..." value={formData.nombres} onChange={handleInputChange} />
                <Label_Input id='apellidos' atributo='Apellidos' tipo='text' textDefault='Ingresa tus apellidos...' value={formData.apellidos} onChange={handleInputChange} />
                <Label_Input id='correo' atributo='Correo Electrónico' tipo='email' textDefault='Ingresa tu correo electrónico...' value={formData.correo} onChange={handleInputChange} />
                <Label_Input id='telefono' atributo='Teléfono' tipo='number' textDefault='0000000000' value={formData.telefono} onChange={handleInputChange} />
            </form>
            <h3 className='texto_DetallesReserva'>Detalles del pago</h3>
            <EleccionTarjeta onPaymentMethodSelect={onPaymentMethodSelect} />
            <form className='formularioDatosPago'>
                <Label_Input id='nombreTitular' atributo='Nombre del titular de la tarjeta' tipo='text' textDefault='Nombre del titular...' value={formData.nombreTitular} onChange={handleInputChange} />
                <Label_Input id='numeroTarjeta' atributo='Número de la tarjeta' tipo='number' textDefault='0000 0000 ' value={formData.numeroTarjeta} onChange={handleInputChange} />
                <Label_Input id='codigoSeguridad' atributo='Código de seguridad' tipo='number' textDefault='000' value={formData.codigoSeguridad} onChange={handleInputChange} />
                <Label_Input id='fechaExpiracion' atributo='Fecha de expiración' tipo='text' textDefault='MM/AA' value={formData.fechaExpiracion} onChange={handleInputChange} />
            </form>
        </div>
    );
}

export default IngresoDatosPersonales;
