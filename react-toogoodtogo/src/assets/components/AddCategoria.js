import React, { useState } from "react";
import "../styles/addCategoria.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCategorias({onAgregarCategoria }) {
  const idNegocio = Cookies.get('id');
  const [imageSrc, setImageSrc] = useState(null);
  const [subirImagen, setSubirImagen] = useState(null);
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState(true);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

const handleAddCategoria = async (e) => {
  try {
    e.preventDefault();

    const newErrors = {};
    if (!categoria) newErrors.categoria = 'La categoría es requerida';
    if (!descripcion) newErrors.descripcion = 'La descripción es requerida';
    if (!imageSrc) newErrors.icono = 'El icono es requerido';
    
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    const fechaCreacion = new Date();

    const formData = new FormData();
    formData.append('id_negocio', idNegocio); // Ajusta según tu lógica de categoría seleccionada
    formData.append('nombre_categoria', categoria);
    formData.append('descripcion', descripcion);
    formData.append('habilitado', estado);
    formData.append('imagen_categoria', subirImagen);
    formData.append('fecha_creacion', fechaCreacion);
    const response = await axios.post(`http://localhost:8000/api/categorias/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Categoria creada:', response.data);
    toast.success('Guardado');
    // Aquí podrías manejar la respuesta como necesites (actualizar estado, mostrar mensaje de éxito, etc.)
  } catch (error) {
    toast.error('Error al agregar.');
    console.error('Error al crear categoria:', error);
    // Aquí podrías manejar el error como necesites (mostrar mensaje de error, rollback de cambios, etc.)
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
    <div className="main-container-categoria-add">
      <main className="contenido-categoria">
        <div className="contenedor-addCategoria">
          <div className="formulario-addCategoria">
            <form>
              <div className="nombreCategoria">
                <label>Nombre de la Categoria</label>
                <input type="text" className="nombreIngresadoCategoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required/>
                {errors.categoria && <p style={{ color: 'red' }}>{errors.categoria}</p>}
              </div>
              <div className="descripcionCategoria">
                <label>Descripción</label>
                <textarea className="descripcionIngresadaCategoria" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                {errors.descripcion && <p style={{ color: 'red' }}>{errors.descripcion}</p>}
              </div>
              <div className="estadoCategoria">
                <label>Categoría</label>
                <select className="comboOpcionesCategoria" value={estado} onChange={(e) => {
                    const selectedOption = e.target.value;
                    console.log('Opción seleccionada:', selectedOption);
                    setEstado(selectedOption);
                }}>
                    <option value="">Seleccionar...</option>
                    <option value={true}>Activo</option>
                    <option value={false}>Inactivo</option>
                </select>
              </div>
            </form>
          </div>
          <div className="icono-addCategoria">
            <div className="icono-Categoria">
              <label>Icono de la Categoria</label>
              <div className="image-preview-container-categoria">
                {imageSrc ? (
                  <img src={imageSrc} alt="Categoria" className="categoria-icono" />
                ) : (
                  <div className="image-placeholder">Vista previa del icono</div>
                )}
              </div>
              <div className="image-upload-container-categoria">
                <input
                  type="file"
                  id="file-input"
                  className="iconoIngresadaCategoria"
                  onChange={handleImageChange}
                />
                {errors.icono && <p style={{ color: 'red' }}>{errors.icono}</p>}
                <label htmlFor="file-input" className="btn_subirIconoCategoria">
                  Subir Icono
                </label>
              </div>
              <button className="btn_agregarCategoria" onClick={handleAddCategoria}>Agregar Categoría</button>
            </div>
          </div>
        </div>
      </main>
      <div className="waves-background2-add-categoria"></div>
      <footer className="contenedorFooter-add-categoria">
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

export default AddCategorias;