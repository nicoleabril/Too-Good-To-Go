let productosComprados = [];

export const addProductoComprado = (producto) => {
  productosComprados.push(producto);
  // Guardar en el almacenamiento local
  sessionStorage.setItem('productos', JSON.stringify(productosComprados));
};

export const getProductosComprados = () => {
  // Obtener los productos del almacenamiento local
  const storedProductos = sessionStorage.getItem('productos');
  return storedProductos ? JSON.parse(storedProductos) : productosComprados;
};
