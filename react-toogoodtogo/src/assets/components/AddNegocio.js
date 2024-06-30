import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "../styles/addProduct.css";
import donas from '../images/donas.png'
import dunkin_logo from '../images/dunkin_donuts_logo.jpeg'
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios


const AddNegocio = () => {

  const idNegocio = Cookies.get('id');
  const [negocio, setNegocio] = useState([]);
  const [subirLogo, setSubirLogo] = useState(null);
  const [subirImagen, setSubirImagen] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [imageSrc, setImageSrc] = useState([]);
  const [logoSrc, setLogo] = useState([]);
  const [nombreNegocio, setNombreNegocio] = useState('Dunkin\' Donuts');
  const [descNegocio, setDescNegocio] = useState('Dunkin\' Donuts ofrece una amplia variedad de productos, incluyendo donas, café, bebidas frías y calientes, sándwiches de desayuno, bagels, muffins y otros productos de panadería.');
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSubirImagen(file);
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const byteArray = new Uint8Array(arrayBuffer);
      console.log(byteArray);
      
    };
    reader.readAsArrayBuffer(file);

    const reader2 = new FileReader();
    reader2.onload = (e) => {
      setImageSrc(e.target.result);
    };
    reader2.readAsDataURL(file);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setSubirLogo(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const byteArray = new Uint8Array(arrayBuffer);
    };
    reader.readAsArrayBuffer(file);

    const reader2 = new FileReader();
    reader2.onload = (e) => {
      setLogo(e.target.result);
    };
    reader2.readAsDataURL(file);
  };

  useEffect(() => {
    const obtenerNegocio = async () => {
      try {
          const response = await axios.get(`http://localhost:8000/api/negocios/${idNegocio}`);
          setNegocio(response.data.data);
          if(response.data.data != null){
            setNombreNegocio(response.data.data.nombre_negocio);
            setDescNegocio(response.data.data.descripcion);
          }
          if(response.data.data.logotipo!=null){
            const binaryString = window.atob(response.data.data.logotipo);
            // Convertir a un array de bytes
            const byteArray = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              byteArray[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: 'image/jpg' }); // Ajusta el tipo MIME según el tipo de imagen que esperas
            const imageUrl = URL.createObjectURL(blob);
            setLogo(imageUrl);
          }
          if(response.data.data.imagen_referencial!=null){
            const binaryString = window.atob(response.data.data.imagen_referencial);
            // Convertir a un array de bytes
            const byteArray = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              byteArray[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: 'image/jpg' }); // Ajusta el tipo MIME según el tipo de imagen que esperas
            const imageUrl = URL.createObjectURL(blob);
            setImageSrc(imageUrl);
          }
      } catch (error) {
          console.error('Error al obtener negocio:', error);
      }
    };

    const obtenerCategoria = async () => {
      try {
          const response = await axios.get(`http://localhost:8000/api/categorias-negocio/`);
          setCategorias(response.data.categorias);
      } catch (error) {
          console.error('Error al obtener negocio:', error);
      }
    };

  obtenerNegocio();
  obtenerCategoria();
  }, []);


  const handleInputNombre = (e) => {
    setNombreNegocio(e.target.value); // Actualizar la opción seleccionada
  };

  const handleInputDescripcion = (e) => {
    setDescNegocio(e.target.value); // Actualizar la opción seleccionada
  };

  const handleInputCategoria = (selectedOption) => {
    setCategoriaSeleccionada(selectedOption); // Actualizar la opción seleccionada
  };

  

  const handleUpdateNegocio = async (e) => {
    try {
      e.preventDefault();
      console.log(subirImagen);
      console.log(subirLogo);
      const formData = new FormData();
      formData.append('id_categoria', categoriaSeleccionada?.value); // Ajusta según tu lógica de categoría seleccionada
      formData.append('nombre_negocio', nombreNegocio);
      formData.append('descripcion', descNegocio);
      formData.append('logotipo', subirLogo);
      formData.append('imagen_referencial', subirImagen);
      formData.append('posicion_x', negocio.posicion_x);
      formData.append('posicion_y', negocio.posicion_y);

      const response = await axios.post(`http://localhost:8000/api/negocios/${idNegocio}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Negocio actualizado:', response.data);
      // Aquí podrías manejar la respuesta como necesites (actualizar estado, mostrar mensaje de éxito, etc.)
    } catch (error) {
      console.error('Error al actualizar negocio:', error);
      // Aquí podrías manejar el error como necesites (mostrar mensaje de error, rollback de cambios, etc.)
    }
  };

  return (
    <div className="main-container-product-add">
      <main className="contenido">
        <div className="contenedor-addProduct">
          <div className="formulario-addProduct">
            <form>
              <div className="nombreNegocio">
                <label>Nombre del Negocio</label>
                <input type="text" className="nombreIngresadoNegocio" onChange={handleInputNombre} value={nombreNegocio ? nombreNegocio : ''} />
              </div>
              <div className="descripcion">
                <label>Descripción</label>
                <textarea className="descripcionIngresada" onChange={handleInputDescripcion} value={descNegocio ? descNegocio : ''}></textarea>
              </div>
              <div className="categoria">
                <label>Categoría</label>
                <Select
                  className="comboOpciones"
                  value={categoriaSeleccionada}
                  onChange={handleInputCategoria}
                  options={categorias.map(categoria => ({
                    value: categoria.id_categoria,
                    label: categoria.nombre,
                  }))}
                  placeholder="Selecciona una opción..."
                />
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
              <button className="btn_agregarProducto" onClick={handleUpdateNegocio}>Guardar</button>
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
