import React, { useState } from "react";
import "../styles/addProduct.css";

function EditOfertas() {
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
    <div className="main-container-product-add">
      <main className="contenido">
        <div className="contenedor-addProduct">
          <div className="formulario-addProduct">
            <form>
              <div className="nombre">
                <label>Nombre de la Oferta</label>
                <input type="text" className="nombreIngresado" />
              </div>
              <div className="descripcion">
                <label>Descripción</label>
                <textarea className="descripcionIngresada"></textarea>
              </div>
              <div className="precio-oferta">
                <label>Precio</label>
                <div className="precio-inputs">
                  <input type="number" className="enteros" />
                  <span className="decimal-point">,</span>
                  <input type="number" className="decimales" />
                </div>
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
              <button className="btn_agregarProducto">Actualizar Oferta</button>
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

export default EditOfertas;
