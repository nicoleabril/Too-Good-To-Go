let reservasEnCola = JSON.parse(localStorage.getItem('reservasEnCola')) || [];

// Función para agregar una nueva reserva
export const addReservaEnCola = (reserva) => {
  reservasEnCola.push(reserva);
  localStorage.setItem('reservasEnCola', JSON.stringify(reservasEnCola));
  console.log('Reserva agregada:', reserva);
  console.log('Reservas en cola:', reservasEnCola);
};

// Función para obtener todas las reservas en cola
export const getReservasEnCola = () => {
  return JSON.parse(localStorage.getItem('reservasEnCola')) || [];
};

// Inicializar reservas con datos predefinidos si no existen
if (reservasEnCola.length === 0) {
  const reservasIniciales = [
    { id: '1', nombreCliente: 'Jose Luis Rivera', celular:'0985120236', metodoPago: 'En Efectivo', pedido: '1 Té helado + 2 donas', horaReserva: '16:30-17:00' },
    { id: '2', nombreCliente: 'Maria Fernanda Ríos',celular:'0985120236', metodoPago: 'Tarjeta de Crédito', pedido: '2 Caja sorpresa#2', horaReserva: '12:00-14:00' },
    { id: '3', nombreCliente: 'Juan Carlos', celular:'0985120236',metodoPago: 'En Efectivo', pedido: '1 Caja sorpresa#1', horaReserva: '15:00-16:30' },
    { id: '4', nombreCliente: 'Luisa Fernanda',celular:'0985120236', metodoPago: 'Tarjeta de Crédito', pedido: '1 Té helado + 3 donas', horaReserva: '11:00-15:00' }
  ];
  reservasEnCola = reservasIniciales;
  localStorage.setItem('reservasEnCola', JSON.stringify(reservasEnCola));
}
