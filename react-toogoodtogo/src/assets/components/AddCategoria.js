import React, { useState } from "react";
import "../styles/addCategoria.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function AddCategorias({onAgregarCategoria }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo'); // Valor por defecto "Activo"
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!categoria) newErrors.categoria = 'La categoría es requerida';
    if (!descripcion) newErrors.descripcion = 'La descripción es requerida';
    if (!imageSrc) newErrors.icono = 'El icono es requerido';
    
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    const fechaCreacion = new Date().toLocaleDateString();
    const nuevaCategoria = {
        categoria,
        descripcion,
        estado,
        fechaCreacion,
        icono: null
    };
    Cookies.set('nuevaCategoria', JSON.stringify(nuevaCategoria));
    navigate('/RegistroCategoria'); // Redirige de vuelta al listado de categorías
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
                <select className="comboOpcionesCategoria" value={estado} onChange={(e) => setEstado(e.target.value)} required>
                  <option>Seleccionar...</option>
                  <option>Activo</option>
                  <option>Inactivo</option>
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
              <button className="btn_agregarCategoria" onClick={handleSubmit}>Agregar Categoría</button>
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
    </div>
  );
}

export default AddCategorias;