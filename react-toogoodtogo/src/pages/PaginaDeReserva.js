import React, { useState, useEffect } from 'react';
import { getProductosComprados, addProductoComprado, removeProductoComprado } from '../assets/components/productosComprados'; // Asegúrate de importar estas funciones
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ResumenDelaReserva from '../assets/components/Reserva/ResumenDelaReserva';
import CabeceraDelResumen from '../assets/components/Reserva/CabeceraDelResumen';
import IngresoDatosPersonales from '../assets/components/Reserva/IngresoDatosPersonales';
import InformacionDeLaReserva from '../assets/components/Reserva/InformacionDeLaReserva';

function PaginaDeReserva() {
  const idNegocio = JSON.parse(sessionStorage.getItem('id_negocio')) || {};
  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [negocio, setNegocio] = useState({});
  const [metodoPago, setMetodoPago] = useState('');
  const [total, setTotal] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    nombreTitular: '',
    numeroTarjeta: '',
    codigoSeguridad: '',
    fechaExpiracion: ''
  });

  const iva=0.15;
  const porcentajeTGTG=0.03;

  useEffect(() => {
    const obtenerNegocio = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/negocios/${idNegocio}`);
        setNegocio(response.data.data);
      } catch (error) {
        console.error('Error al obtener negocio:', error);
      }
    };
    obtenerNegocio();
  }, [idNegocio]);

  useEffect(() => {
    const productosComprados = getProductosComprados();
    setProductos(productosComprados);

    const initialCantidades = {};
    productosComprados.forEach(producto => {
      initialCantidades[producto.id_oferta || producto.id_producto] = producto.cantidad || 1;
    });
    setCantidades(initialCantidades);
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [productos, cantidades]);

  const calcularTotal = () => {
    const nuevoTotal = productos.reduce((acc, producto) => {
      const cantidad = cantidades[producto.id_oferta || producto.id_producto] || 1;
      return acc + (producto.precio * cantidad)+((producto.precio * cantidad)*iva)+((producto.precio * cantidad)*porcentajeTGTG);
    }, 0).toFixed(2);
    setTotal(nuevoTotal);
  };

 

  const handleIncrement = (id) => {
    setCantidades(prevCantidades => {
      const nuevaCantidad = (prevCantidades[id] || 1) + 1;
      const producto = productos.find(p => (p.id_oferta || p.id_producto) === id);

      const productosActualizados = productos.map(producto =>
        (producto.id_oferta || producto.id_producto) === id
          ? { ...producto, cantidad: nuevaCantidad }
          : producto
      );

      setProductos(productosActualizados);

      // Actualizar en sessionStorage
      addProductoComprado({ ...productos.find(p => (p.id_oferta || p.id_producto) === id), cantidad: nuevaCantidad }, 'incrementar-decrementar');
      return { ...prevCantidades, [id]: nuevaCantidad };
    });
  };

  const handleDecrement = (id) => {
    setCantidades(prevCantidades => {
      const nuevaCantidad = (prevCantidades[id] || 1) > 1 ? (prevCantidades[id] || 1) - 1 : 1;
      

      const productosActualizados = productos.map(producto =>
        (producto.id_oferta || producto.id_producto) === id
          ? { ...producto, cantidad: nuevaCantidad }
          : producto
      );

      setProductos(productosActualizados);

      // Actualizar en sessionStorage
      addProductoComprado({ ...productos.find(p => (p.id_oferta || p.id_producto) === id), cantidad: nuevaCantidad }, 'incrementar-decrementar');
      return { ...prevCantidades, [id]: nuevaCantidad };
    });
  };


  const handleRemove = (id) => {
    setProductos(prevProductos => {
      const productosActualizados = prevProductos.filter(producto => (producto.id_oferta || producto.id_producto) !== id);
      setCantidades(prevCantidades => {
        const { [id]: _, ...restCantidades } = prevCantidades;
        return restCantidades;
      });
      removeProductoComprado(id); // Elimina del sessionStorage
      return productosActualizados;
    });
  };

  const validateForm = () => {
    const requiredFields = ['nombres', 'apellidos', 'correo', 'telefono'];
    for (let field of requiredFields) {
      if (!personalInfo[field]) {
        toast.error(`Llene todos los campos obligatorios de información personal.`);
        return false;
      }
    }

    if (metodoPago === 'visa' || metodoPago === 'mastercard' || metodoPago === 'paypal') {
      const paymentFields = ['nombreTitular', 'numeroTarjeta', 'codigoSeguridad', 'fechaExpiracion'];
      for (let field of paymentFields) {
        if (!personalInfo[field]) {
          toast.error(`Llene todos los campos obligatorios de información de pago.`);
          return false;
        }
      }
    }

    if (!metodoPago) {
      toast.error('Debe seleccionar un método de pago.');
      return false;
    }

    return true;
  };

  const handlePersonalInfoSubmit = (info) => {
    setPersonalInfo(info);
  };

  const handleReservarClick = async () => {
    if (!validateForm()) {
      return;
    }
    console.log(metodoPago);
    const nuevaReserva = {
      id_negocio: idNegocio,
      id_cliente: Cookies.get('id'),
      metodo_pago: metodoPago === 'pagoEfectivo' ? 'Pago en Efectivo' : metodoPago === 'visa' ? 'Tarjeta de Débito' : metodoPago === 'mastercard' ? 'Tarjeta de Crédito' : '',
      fecha: new Date().toISOString(),
      hora_minima: negocio.horario_oferta,
      hora_maxima: negocio.horario_cierre,
      estado: 'Pendiente',
      nombres: personalInfo.nombres,
      apellidos: personalInfo.apellidos,
      correo_electronico: personalInfo.correo,
      telefono: personalInfo.telefono,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/reservas', nuevaReserva, {
        headers: {
          Authorization: `Bearer ${Cookies.get('authToken')}`,
        },
      });

      if (response.status === 201) {
        const nuevaReservaId = response.data.reserva.id_reserva;
        productos.forEach(async producto => {
          const tipoProducto = producto.id_producto ? 'Normal' : 'Oferta';
          const idProducto = producto.id_producto || producto.id_oferta; // Usar id_producto o id_oferta

          //Ahora por cada producto se va a crear una fila en la tabla productos_reservados
          const producto_reservado = {
            id_producto: idProducto,
            id_reserva: nuevaReservaId,
            id_negocio: idNegocio,
            id_cliente: Cookies.get('id'),
            cantidad: producto.cantidad,
            tipo_producto: tipoProducto,
          }
          try {
            const producto_reservadoResponse = await axios.post('http://localhost:8000/api/productos_reservados', producto_reservado, {
              headers: {
                Authorization: `Bearer ${Cookies.get('authToken')}`,
              },
            });

            if (producto_reservadoResponse.status === 201) {
              
            } else {
              console.error('Error al guardar el producto.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        });
        toast.success('Reserva guardada correctamente', {
          onClose: () => {
            // Volver atrás en el historial después de que se cierre el toast
            window.history.back();
          }
        });

        console.log('Reserva guardada:', response.data);
      } else {
        toast.error('Error al guardar la reserva.');
      }
    } catch (error) {
      toast.error('Error al guardar la reserva.');
      console.error('Error:', error);
    }
    sessionStorage.removeItem('productos');
    //window.history.back();
  };

  const handleReservarClickCancel = async () => { //------------------
    window.history.back();
  };

  const authToken = Cookies.get('authToken');

  if (!authToken) {
    return <Navigate to="/" />;
  }
  //calculamos  el total final con la comisión de tgtg
  
  return (
    //declaramos la variable del iva
    <div className='cont-principalReserva'>
      <header page={'Reserva'} />
      <div className='cont-resumenReserva'>
        <button className="back-button" onClick={() => window.history.back()}>←</button>
        <CabeceraDelResumen nombre_negocio={negocio.nombre_negocio} />
        <ResumenDelaReserva
          productos={productos}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onRemove={handleRemove}
          cantidades={cantidades}
        />
        <p className='totalReserva'>Total: $ {total}</p>
      </div>
      <div className='cont-detallesReserva'>
        <h1 className='texto_CompletaReserva'>Completa tu reserva</h1>
        <IngresoDatosPersonales
          onPaymentMethodSelect={setMetodoPago}
          onPersonalInfoSubmit={handlePersonalInfoSubmit}
        />
        <InformacionDeLaReserva
          metodoPago={metodoPago === 'pagoEfectivo' ? 'Pago en Efectivo' : 'visa' ? 'Tarjeta de Débito' : ''}
          estado={'Pendiente'}
          restaurante={negocio.nombre_negocio}
          horario={negocio.horario_oferta + " - " + negocio.horario_cierre}
        />
        <div className='textoAviso'>
          <p>Haciendo su pedido a través de esta aplicación usted acepta: - Política de Procesamiento de Datos - Acuerdo de licencia de usuario final - Términos del restaurante - Políticas de privacidad</p><br></br>
          <p>El total de tu reserva ya considera el {iva*100}% de iva y  nuestra comisión de {porcentajeTGTG*100}%. </p>
        </div>
        <div className='grupoDeBotones'>
          <button id='btnCancelar' className='btnCancelar ' onClick={handleReservarClickCancel}>Cancelar</button>
          <button id='btnReservar' className='btnReservar' onClick={handleReservarClick}>Reservar</button>
        </div>
      </div>
      <ToastContainer
        closeButtonStyle={{
          fontSize: '10px',
          padding: '4px'
        }}
        style={{ width: '400px' }}
      />
    </div>
  );
}

export default PaginaDeReserva;
