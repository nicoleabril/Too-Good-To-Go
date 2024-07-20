import React, {useState, useEffect} from "react";
import "../styles/addCategoria.css";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';

function AddCategorias() {
  const [imageSrc, setImageSrc] = useState(null);
  const [categoria, setCategoria] = useState([]);
  const id_categoria = sessionStorage.getItem("id_categoria");
  const idNegocio = Cookies.get('id');
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [subirImagen, setSubirImagen] = useState(null);
  const [estado, setEstado] = useState(true);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSubirImagen(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
        const obtenerCategoria = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/categoria/${id_categoria}`);
                setCategoria(response.data.categoria);
                if(response.data.categoria){
                  setNombreCategoria(response.data.categoria.nombre_categoria);
                  setDescripcion(response.data.categoria.descripcion);
                  setEstado(response.data.categoria.habilitado);
                }
                if(response.data.categoria.imagen_categoria!=null){
                  setImageSrc(response.data.categoria.imagen_categoria);
                }
            } catch (error) {
                console.error('Error al obtener categoria:', error);
            }
        };

        obtenerCategoria();
  }, [idNegocio]); 


  const handleUpdateCategoria = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('nombre_categoria', nombreCategoria);
      formData.append('descripcion', descripcion);
      formData.append('habilitado', estado);
      if(subirImagen != null) formData.append('imagen_categoria', subirImagen);
      const response = await axios.post(`http://localhost:8000/api/categorias/${id_categoria}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Guardado');
      console.log('Categoria actualizada:', response.data);
      // Aquí podrías manejar la respuesta como necesites (actualizar estado, mostrar mensaje de éxito, etc.)
    } catch (error) {
      toast.error('Error al editar.');
      console.error('Error al actualizar categoria:', error);
      // Aquí podrías manejar el error como necesites (mostrar mensaje de error, rollback de cambios, etc.)
    }
  };

  const handleInputNombre = (e) => {
    setNombreCategoria(e.target.value); // Actualizar la opción seleccionada
  };

  const handleInputDescripcion = (e) => {
    setDescripcion(e.target.value); // Actualizar la opción seleccionada
  };


  return (
    <div className="main-container-categoria-add">
      <main className="contenido-categoria">
        <div className="contenedor-addCategoria">
          <div className="formulario-addCategoria">
            <form>
              <div className="nombreCategoria">
                <label>Nombre de la Categoria</label>
                <input type="text" className="nombreIngresadoCategoria" onChange={handleInputNombre} value={nombreCategoria ? nombreCategoria : ''}/>
              </div>
              <div className="descripcionCategoria">
                <label>Descripción</label>
                <textarea className="descripcionIngresadaCategoria" onChange={handleInputDescripcion} value={descripcion ? descripcion : ''}></textarea>
              </div>
              <div className="estadoCategoria">
                <label>Estado</label>
                <select className="comboOpcionesCategoria" value={estado} onChange={(e) => setEstado(e.target.value)}>
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
                <label htmlFor="file-input" className="btn_subirIconoCategoria">
                  Cambiar Icono
                </label>
              </div>
              <button className="btn_actualizarCategoria" onClick={handleUpdateCategoria}>Actualizar Categoría</button>
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