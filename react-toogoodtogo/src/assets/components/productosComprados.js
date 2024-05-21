const getProductosCompradosFromStorage = () => {
    const productos = sessionStorage.getItem('productosComprados'); 
    return productos ? JSON.parse(productos) : [];  
  };
  
  let productosComprados = getProductosCompradosFromStorage(); 
  
  export const addProductoComprado = (producto) => { /*En esta función se agrega un producto al carrito de compras */
    // Evitar agregar duplicados
    if (!productosComprados.some(p => p.name === producto.name)) {
      productosComprados.push(producto);
    }
    sessionStorage.setItem('productosComprados', JSON.stringify(productosComprados));
    console.log('Producto agregado Storage:', producto);
    console.log('Productos comprados Storage:', productosComprados);
  };
  
  export const getProductosComprados = () => productosComprados;
  