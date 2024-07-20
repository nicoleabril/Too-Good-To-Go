import React, { useState } from "react";
import "../styles/addProduct.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddOfertas() {
  const idNegocio = Cookies.get('id');
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [oferta, setOferta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errors, setErrors] = useState({});
  const [precioEntero, setPrecioEntero] = useState('');
  const [precioDecimal, setPrecioDecimal] = useState('');
  const [subirImagen, setSubirImagen] = useState(null);

  const handleEnteroChange = (event) => {
    setPrecioEntero(event.target.value);
  };

  const handleDecimalChange = (event) => {
    setPrecioDecimal(event.target.value);
  };

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      const newErrors = {};
      const precioCompleto = parseFloat(precioEntero + '.' + precioDecimal);
      if (!oferta) newErrors.oferta = 'La oferta es requerida';
      if (!descripcion) newErrors.descripcion = 'La descripción es requerida';
      if (!precioCompleto) newErrors.precio = 'El precio es requerido';
      if (!imageSrc) newErrors.icono = 'El icono es requerido';
      
      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
      }

      const fechaCreacion = new Date();

      const formData = new FormData();
      formData.append('id_negocio', idNegocio); // Ajusta según tu lógica de categoría seleccionada
      formData.append('nombre_oferta', oferta);
      formData.append('descripcion', descripcion);
      formData.append('imagen_oferta', subirImagen);
      formData.append('precio', precioCompleto);
      formData.append('fecha_creacion', fechaCreacion);
      const response = await axios.post(`http://localhost:8000/api/ofertas/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Oferta creada:', response.data);
      toast.success('Guardado');
    } catch(error){
      toast.error('Error al agregar.');
      console.error('Error al crear categoria:', error);
    }
    
};

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSubirImagen(file);
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
                <label>Nombre de la Oferta</label>
                <input type="text" className="nombreIngresado" value={oferta} onChange={(e) => setOferta(e.target.value)} required/>
                {errors.oferta && <p style={{ color: 'red' }}>{errors.oferta}</p>}
              </div>
              <div className="descripcion">
                <label>Descripción</label>
                <textarea className="descripcionIngresada" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                {errors.descripcion && <p style={{ color: 'red' }}>{errors.descripcion}</p>}
              </div>
              <div className="precio-oferta">
              <label>Precio</label>
                <div className="precio-inputs">
                  <input
                    type="number"
                    className="enteros"
                    value={precioEntero}
                    onChange={handleEnteroChange}
                  />
                  <span className="decimal-point">,</span>
                  <input
                    type="number"
                    className="decimales"
                    value={precioDecimal}
                    onChange={handleDecimalChange}
                  />
                </div>
                {errors.precio && <p style={{ color: 'red' }}>{errors.precio}</p>}
              </div>
            </form>
          </div>
          <div className="imagen-addProduct">
            <div className="imagen">
              <label>Imagen de la Oferta</label>
              <div className="image-preview-container">
                {imageSrc ? (
                  <img src={imageSrc} alt="Oferta" className="producto-imagen" />
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
              <button className="btn_agregarProducto" onClick={handleSubmit}>Agregar Oferta</button>
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

export default AddOfertas;
