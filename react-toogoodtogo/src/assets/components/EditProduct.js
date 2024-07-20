import React, { useState, useEffect } from "react";
import "../styles/addProduct.css";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';

function AddProduct() {
  const id_producto = sessionStorage.getItem("id_producto");
  const idNegocio = Cookies.get('id');
  const [subirImagen, setSubirImagen] = useState(null);
  const [producto, setProducto] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [precioEntero, setPrecioEntero] = useState('');
  const [precioDecimal, setPrecioDecimal] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setSubirImagen(file);
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleEnteroChange = (event) => {
    setPrecioEntero(event.target.value);
  };

  const handleDecimalChange = (event) => {
    setPrecioDecimal(event.target.value);
  };

  function separarParteEnteraDecimal(precio) {
    const [entera, decimal] = precio.toString().split('.');
    return {
        entera: parseInt(entera, 10),
        decimal: decimal ? parseInt(decimal.padEnd(2, '0').substring(0, 2), 10) : 0
    };
  }

  useEffect(() => {

    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/producto/${id_producto}`);
        setProducto(response.data.producto);
        const producto = response.data.producto;
        if(producto){
          setNombreProducto(producto.nombre_producto);
          setDescripcion(producto.descripcion);
          setCategoria(producto.id_categoria);
          const partes = separarParteEnteraDecimal(producto.precio);
          setPrecioDecimal(partes.decimal);
          setPrecioEntero(partes.entera);
        }
        if(producto.imagen!=null){
          setImageSrc(producto.imagen);
        }
      } catch (error) {
        console.error('Error al obtener producto:', error);
      }
    };

    const obtenerCategoria = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/categorias/${idNegocio}`);
        setCategorias(response.data.categorias);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
  
    obtenerCategoria();
    obtenerProducto();
  }, [idNegocio]);


  const handleUpdateProducto = async (e) => {
    try {
      e.preventDefault();
      const precio = parseFloat(precioEntero + '.' + precioDecimal);
      const formData = new FormData();
      formData.append('id_categoria', categoria);
      formData.append('nombre_producto', nombreProducto);
      formData.append('descripcion', descripcion);
      formData.append('precio', precio);
      if(subirImagen != null) formData.append('imagen', subirImagen);
      const response = await axios.post(`http://localhost:8000/api/productos/${id_producto}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Guardado');
      console.log('Producto actualizado:', response.data);
    } catch (error) {
      toast.error('Error al editar.');
      console.error('Error al actualizar producto:', error);
      // Aquí podrías manejar el error como necesites (mostrar mensaje de error, rollback de cambios, etc.)
    }
  };

  const handleInputNombre = (e) => {
    setNombreProducto(e.target.value); // Actualizar la opción seleccionada
  };

  const handleInputDescripcion = (e) => {
    setDescripcion(e.target.value); // Actualizar la opción seleccionada
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
                <input type="text" className="nombreIngresado" onChange={handleInputNombre} value={nombreProducto ? nombreProducto : ''}/>
              </div>
              <div className="descripcion">
                <label>Descripción</label>
                <textarea className="descripcionIngresada" onChange={handleInputDescripcion} value={descripcion ? descripcion : ''}></textarea>
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
                />
              </div>
              <div className="precio">
                <label>Precio</label>
                <div className="precio-inputs">
                  <input type="number" className="enteros" value={precioEntero ? precioEntero : 0} onChange={handleEnteroChange}/>
                  <span className="decimal-point">,</span>
                  <input type="number" className="decimales" value={precioDecimal ? precioDecimal : 0} onChange={handleDecimalChange}/>
                </div>
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
                  Cambiar Imagen
                </label>
              </div>
              <button className="btn_editarProducto" onClick={handleUpdateProducto}>Actualizar Producto</button>
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
            fontSize: '12px', // Tamaño de fuente del botón de cerrar
            padding: '4px'    // Espaciado interno del botón de cerrar
          }}
          style={{ width: '400px' }} // Ancho deseado para ToastContainer
        />
    </div>
  );
}

export default AddProduct;
