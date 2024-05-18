import React, { useState } from "react";
import "../styles/addCategoria.css";

function AddCategorias() {
  const [imageSrc, setImageSrc] = useState(null);

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
                <label>Nombre del Producto</label>
                <input type="text" className="nombreIngresadoCategoria" />
              </div>
              <div className="descripcionCategoria">
                <label>Descripción</label>
                <textarea className="descripcionIngresadaCategoria"></textarea>
              </div>
              <div className="estadoCategoria">
                <label>Categoría</label>
                <select className="comboOpcionesCategoria">
                  <option>Seleccionar...</option>
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>
              <div className="fechaCreacionCategoria">
                <label>Fecha Creación</label>
                <input type="date" className="fechaIngresadaCategoria" />
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
                <label htmlFor="file-input" className="btn_subirIconoCategoria">
                  Subir Icono
                </label>
              </div>
              <button className="btn_agregarCategoria">Agregar Categoría</button>
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