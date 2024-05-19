import React, { useState } from "react";
import "../styles/addProduct.css";
import donas from '../images/donas.png'
import dunkin_logo from '../images/dunkin_donuts_logo.jpeg'
function AddNegocio() {
  const [imageSrc, setImageSrc] = useState(donas);
  const [logoSrc, setLogo] = useState(dunkin_logo);
  const [nombreNegocio, setNombreNegocio] = useState('Dunkin\' Donuts');
  const [descNegocio, setDescNegocio] = useState('Dunkin\' Donuts ofrece una amplia variedad de productos, incluyendo donas, café, bebidas frías y calientes, sándwiches de desayuno, bagels, muffins y otros productos de panadería.');
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setLogo(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="main-container-product-add">
      <main className="contenido">
        <div className="contenedor-addProduct">
          <div className="formulario-addProduct">
            <form>
              <div className="nombreNegocio">
                <label>Nombre del Negocio</label>
                <input type="text" className="nombreIngresadoNegocio" value={nombreNegocio} />
              </div>
              <div className="descripcion">
                <label>Descripción</label>
                <textarea className="descripcionIngresada" value={descNegocio}></textarea>
              </div>
              <div className="categoria">
                <label>Categoría</label>
                <select className="comboOpciones">
                    <option>Seleccionar...</option>
                    <option>Bar</option>
                    <option selected>Cafetería</option>
                    <option>Pizzería</option>
                </select>
              </div>
            </form>
          </div>
          <div className="imagen-addProduct">
            <div className="imagen-logo">
              <label>Logotipo</label>
              <div className="image-preview-container-logo">
                {logoSrc ? (
                  <img src={logoSrc} alt="Logotipo" className="producto-imagen-logo" />
                ) : (
                  <div className="image-placeholder">Vista previa de la imagen</div>
                )}
              </div>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="file-input2"
                  className="imagenIngresada"
                  onChange={handleLogoChange}
                />
                <label htmlFor="file-input2" className="btn_subirImagen">
                  Subir Imagen
                </label>
              </div>
            </div>
          </div>
          <div className="imagen-addProduct-referencial">
            <div className="imagen-referencial">
              <label>Imagen Referencial</label>
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
              <button className="btn_agregarProducto">Agregar Producto</button>
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

export default AddNegocio;
