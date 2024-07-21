import React, { useState, useEffect } from "react";
import "../styles/addProduct.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const customStyles = {
  menu: (provided) => ({
    ...provided,
    maxHeight: '100px', // Limitar la altura máxima del menú desplegable
    overflowY: 'auto',  // Agregar barra de desplazamiento vertical
  }),
  option: (provided) => ({
    ...provided,
    height: '30px', // Altura de cada opción
  }),
};

function AddProduct() {
  const idNegocio = Cookies.get('id');
  const [imageSrc, setImageSrc] = useState(null);
  const [subirImagen, setSubirImagen] = useState(null);
  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const precio = parseFloat(precioEntero + '.' + precioDecimal);
    const precioCompleto = '$' + precio;
    if (!producto) newErrors.producto = 'El nombre del producto es requerido';
    if (!categoria) newErrors.categoria = 'La categoría es requerida';
    if (!precio) newErrors.precio = 'El precio es requerido';
    if (!imageSrc) newErrors.icono = 'El icono es requerido';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    try {
        const formData = new FormData();
        formData.append('id_negocio', idNegocio);
        formData.append('id_categoria', categoria);
        formData.append('nombre_producto', producto);
        formData.append('descripcion', descripcion);
        formData.append('imagen', subirImagen);
        formData.append('precio', precio);

        const response = await axios.post(`http://localhost:8000/api/productos/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Producto creado:', response.data);
        toast.success('Guardado');
    } catch (error) {
        toast.error('Error al agregar.');
        console.error('Error al crear producto:', error);
    }
};



useEffect(() => {

  const obtenerCategoria = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/categorias/${idNegocio}`);
      setCategorias(response.data.categorias);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  obtenerCategoria();
}, [idNegocio]); // Agregar idNegocio como dependencia si deseas que el efecto se ejecute al cambiar idNegocio


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setSubirImagen(file);
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleInputCategoria = (selectedOption) => {
    setCategoria(selectedOption.value); // Actualizar la opción seleccionada
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
                <Select
                  className="comboOpciones"
                  onChange={handleInputCategoria}
                  options={categorias.map(categoria => ({
                    value: categoria.id_categoria,
                    label: categoria.nombre_categoria,
                  }))}
                  placeholder="Escoger categoría..."
                  styles={customStyles}
                />
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
      <ToastContainer
          closeButtonStyle={{
            fontSize: '10px', // Tamaño de fuente del botón de cerrar
            padding: '4px'    // Espaciado interno del botón de cerrar
          }}
          style={{ width: '400px' }} // Ancho deseado para ToastContainer
        />
    </div>
  );
}

export default AddProduct;
