import React, { useState, useEffect } from "react";
import "../styles/addProduct.css";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';

function EditOfertas() {
  const [imageSrc, setImageSrc] = useState(null);
  const [oferta, setOferta] = useState([]);
  const id_oferta = sessionStorage.getItem("id_oferta");
  const idNegocio = Cookies.get('id');
  const [nombreOferta, setNombreOferta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [subirImagen, setSubirImagen] = useState(null);
  const [precioEntero, setPrecioEntero] = useState('');
  const [precioDecimal, setPrecioDecimal] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSubirImagen(file);
    const reader = new FileReader();
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
    const obtenerOferta = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/oferta/${id_oferta}`);
            setOferta(response.data.oferta);
            if(response.data.oferta){
              setNombreOferta(response.data.oferta.nombre_oferta);
              setDescripcion(response.data.oferta.descripcion);
              const partes = separarParteEnteraDecimal(response.data.oferta.precio);
              setPrecioDecimal(partes.decimal);
              setPrecioEntero(partes.entera);
            }
            if(response.data.oferta.imagen_oferta!=null){
              setImageSrc(response.data.oferta.imagen_oferta);
            }
        } catch (error) {
            console.error('Error al obtener oferta:', error);
        }
    };

    obtenerOferta();
}, [idNegocio]);

  const handleUpdateOferta = async (e) => {
    try {
      e.preventDefault();
      const precio = parseFloat(precioEntero + '.' + precioDecimal);
      const formData = new FormData();
      formData.append('nombre_oferta', nombreOferta);
      formData.append('descripcion', descripcion);
      formData.append('precio', precio);
      if(subirImagen != null) formData.append('imagen_oferta', subirImagen);
      const response = await axios.post(`http://localhost:8000/api/ofertas/${id_oferta}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Guardado');
      console.log('Oferta actualizada:', response.data);
      // Aquí podrías manejar la respuesta como necesites (actualizar estado, mostrar mensaje de éxito, etc.)
    } catch (error) {
      toast.error('Error al editar.');
      console.error('Error al actualizar oferta:', error);
      // Aquí podrías manejar el error como necesites (mostrar mensaje de error, rollback de cambios, etc.)
    }
  };

  const handleInputNombre = (e) => {
    setNombreOferta(e.target.value); // Actualizar la opción seleccionada
  };

  const handleInputDescripcion = (e) => {
    setDescripcion(e.target.value); // Actualizar la opción seleccionada
  };

  return (
    <div className="main-container-product-add">
      <main className="contenido">
        <div className="contenedor-addProduct">
          <div className="formulario-addProduct">
            <form>
              <div className="nombre">
                <label>Nombre de la Oferta</label>
                <input type="text" className="nombreIngresado" onChange={handleInputNombre} value={nombreOferta ? nombreOferta : ''} />
              </div>
              <div className="descripcion">
                <label>Descripción</label>
                <textarea className="descripcionIngresada" onChange={handleInputDescripcion} value={descripcion ? descripcion : ''}></textarea>
              </div>
              <div className="precio-oferta">
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
              <button className="btn_agregarProducto" onClick={handleUpdateOferta}>Actualizar Oferta</button>
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

export default EditOfertas;
