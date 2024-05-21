import React, { useState } from "react";
import "../styles/addProduct.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function AddProduct() {
  const [imageSrc, setImageSrc] = useState(null);
  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState(''); 
  const [errors, setErrors] = useState({});
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  const [precioEntero, setPrecioEntero] = useState('');
  const [precioDecimal, setPrecioDecimal] = useState('');

  const handleEnteroChange = (event) => {
    setPrecioEntero(event.target.value);
  };

  const handleDecimalChange = (event) => {
    setPrecioDecimal(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const precioCompleto = '$'+parseFloat(precioEntero + '.' + precioDecimal);
    if (!producto) newErrors.oferta = 'El producto es requerida';
    if (!categoria) newErrors.descripcion = 'La categoría es requerida';
    if (!precioCompleto) newErrors.precio = 'El precio es requerido';
    if (!imageSrc) newErrors.icono = 'El icono es requerido';
    
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    const nuevoProducto = {
        producto,
        categoria,
        precio: precioCompleto,
        imagen: null
    };
    Cookies.set('nuevoProducto', JSON.stringify(nuevoProducto));
    navigate('/RegistroProductos'); // Redirige de vuelta al listado de categorías
};


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="main-container-product-add">
      <main className="contenido">
        <div className="contenedor-addProduct">
          <div className="formulario-addProduct">
            <form>
              <div className="nombre">
                <label>Nombre del Producto</label>
                <input type="text" className="nombreIngresado" value={producto} onChange={(e) => setProducto(e.target.value)} required />
                {errors.producto && <p style={{ color: 'red' }}>{errors.producto}</p>}
              </div>
              <div className="descripcion">
                <label>Descripción</label>
                <textarea className="descripcionIngresada" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                {errors.descripcion && <p style={{ color: 'red' }}>{errors.descripcion}</p>}
              </div>
              <div className="categoria">
                <label>Categoría</label>
                <select className="comboOpciones" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                  <option>Seleccionar...</option>
                  <option>Combos</option>
                  <option>Bebidas</option>
                  <option>Postres</option>
                </select>
              </div>
              <div className="precio">
                <label>Precio</label>
                <div className="precio-inputs">
                  <input type="number" className="enteros" value={precioEntero} onChange={handleEnteroChange}/>
                  <span className="decimal-point">,</span>
                  <input type="number" className="decimales" value={precioDecimal} onChange={handleDecimalChange}/>
                </div>
                {errors.precio && <p style={{ color: 'red' }}>{errors.precio}</p>}
              </div>
            </form>
          </div>
          <div className="imagen-addProduct">
            <div className="imagen">
              <label>Imagen del Producto</label>
              <div className="image-preview-container">
                {imageSrc ? (
                  <img src={imageSrc} alt="Producto" className="producto-imagen" />
                ) : (
                  <div className="image-placeholder">Vista previa de la imagen</div>
                )}
              </div>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="file-input"
                  className="imagenIngresada"
                  onChange={handleImageChange}
                />
                <label htmlFor="file-input" className="btn_subirImagen">
                  Subir Imagen
                </label>
              </div>
              <button className="btn_agregarProducto" onClick={handleSubmit}>Agregar Producto</button>
            </div>
          </div>
        </div>
      </main>
      <div className="waves-background2-add-product"></div>
      <footer className="contenedorFooter-add-producto">
        <div className="textoFooter2">
           Copyright © 2024 Too Good To Go International. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default AddProduct;
