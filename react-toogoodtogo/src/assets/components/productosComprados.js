let productosComprados = [];

export const addProductoComprado = (producto, tipoAccion) => {
  // Obtener productos existentes del almacenamiento local
  const storedProductos = JSON.parse(sessionStorage.getItem('productos')) || [];
  const productoId = producto.id_oferta || producto.id_producto;

  // Encontrar el índice del producto en el almacenamiento
  const index = storedProductos.findIndex(p => (p.id_oferta || p.id_producto) === productoId);

  if (index !== -1) {
    // Si el producto ya está en la lista
    if (tipoAccion === 'comprarMas') {
      // Incrementar la cantidad
      storedProductos[index].cantidad = (storedProductos[index].cantidad || 0) + (producto.cantidad || 1);
    } else {
      storedProductos[index].cantidad = producto.cantidad;
    }
  } else {
    if (tipoAccion === 'comprarMas') {
      // Incrementar la cantidad
      storedProductos.push({ ...producto, cantidad: producto.cantidad || 1 });
    } else {
      producto.cantidad = 1;
      storedProductos.push(producto);
    }
  }

  // Guardar la lista actualizada en el almacenamiento local
  sessionStorage.setItem('productos', JSON.stringify(storedProductos));
};


export const getProductosComprados = () => {
  const storedProductos = sessionStorage.getItem('productos');
  return storedProductos ? JSON.parse(storedProductos) : productosComprados;
};


export const updateProductoComprado = (producto) => {
  // Obtener productos existentes del almacenamiento local
  const storedProductos = JSON.parse(sessionStorage.getItem('productos')) || [];
  console.log('storedProductos', storedProductos);

  const index = storedProductos.findIndex(p => p.id_oferta === producto.id_oferta || p.id_producto === producto.id_producto);

  if (index !== -1) {
    storedProductos[index].cantidad = (storedProductos[index].cantidad || 1) + producto.cantidad;
  } else {
    producto.cantidad = producto.cantidad || 1;
    storedProductos.push(producto);
  }

  // Guardar la lista actualizada en el almacenamiento local
  sessionStorage.setItem('productos', JSON.stringify(storedProductos));
};

// Manejar la eliminación de productos
export const removeProductoComprado = (id) => {
  const storedProductos = JSON.parse(sessionStorage.getItem('productos')) || [];
  const productosActualizados = storedProductos.filter(p => p.id_oferta !== id && p.id_producto !== id);
  sessionStorage.setItem('productos', JSON.stringify(productosActualizados));
};
