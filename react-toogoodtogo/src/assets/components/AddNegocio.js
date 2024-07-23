import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "../styles/addProduct.css";
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';

const customStyles = {
  menu: (provided) => ({
    ...provided,
    maxHeight: '70px', // Limitar la altura máxima del menú desplegable
    overflowY: 'auto',  // Agregar barra de desplazamiento vertical
  }),
  option: (provided) => ({
    ...provided,
    height: '30px', // Altura de cada opción
  }),
};

const AddNegocio = () => {

  const idNegocio = Cookies.get('id');
  const [negocio, setNegocio] = useState([]);
  const [subirLogo, setSubirLogo] = useState(null);
  const [subirImagen, setSubirImagen] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [defaultCategoria, setDefaultCategoria] = useState(null);
  const [imageSrc, setImageSrc] = useState([]);
  const [logoSrc, setLogo] = useState([]);
  const [nombreNegocio, setNombreNegocio] = useState('');
  const [descNegocio, setDescNegocio] = useState('');
  const [horarioApertura, setHorarioApertura] = useState('');
  const [horarioCierre, setHorarioCierre] = useState('');
  const [horarioOferta, setHorarioOferta] = useState('');

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
        if (response.data.data != null) {
          setNombreNegocio(response.data.data.nombre_negocio);
          setDescNegocio(response.data.data.descripcion);
          setHorarioApertura(response.data.data.horario_apertura || '');
          setHorarioCierre(response.data.data.horario_cierre || '');
          setHorarioOferta(response.data.data.horario_oferta || '');
        }
        if (response.data.data.logotipo != null) {
          setLogo(response.data.data.logotipo);
        }
        if (response.data.data.imagen_referencial != null) {
          setImageSrc(response.data.data.imagen_referencial);
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
        console.error('Error al obtener categorías:', error);
      }
    };
  
    obtenerNegocio();
    obtenerCategoria();
  }, [idNegocio]); // Agregar idNegocio como dependencia si deseas que el efecto se ejecute al cambiar idNegocio

  const handleInputNombre = (e) => {
    setNombreNegocio(e.target.value); // Actualizar la opción seleccionada
  };

  const handleInputDescripcion = (e) => {
    setDescNegocio(e.target.value); // Actualizar la opción seleccionada
  };

  const handleInputCategoria = (selectedOption) => {
    setCategoriaSeleccionada(selectedOption.value); // Actualizar la opción seleccionada
  };

  const handleUpdateNegocio = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('id_categoria', categoriaSeleccionada); // Ajusta según tu lógica de categoría seleccionada
      formData.append('nombre_negocio', nombreNegocio);
      formData.append('descripcion', descNegocio);
      formData.append('horario_apertura', horarioApertura);
      formData.append('horario_cierre', horarioCierre);
      formData.append('horario_oferta', horarioOferta);
      if (subirLogo) formData.append('logotipo', subirLogo);
      if (subirImagen) formData.append('imagen_referencial', subirImagen);
      formData.append('posicion_x', negocio.posicion_x);
      formData.append('posicion_y', negocio.posicion_y);

      const response = await axios.post(`http://localhost:8000/api/negocios/${idNegocio}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Negocio actualizado:', response.data);
      toast.success('Guardado');
    } catch (error) {
      toast.error('Error al editar.');
      console.error('Error al actualizar negocio:', error);
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
                  defaultValue={defaultCategoria ?
                    { label: defaultCategoria.nombre,
                      value: defaultCategoria.id_categoria
                    } : null
                  }
                  onChange={handleInputCategoria}
                  options={categorias.map(categoria => ({
                    value: categoria.id_categoria,
                    label: categoria.nombre,
                  }))}
                  placeholder="Escoger categoría..."
                  styles={customStyles}
                />
              </div>
              <div className="horarios">
                <div className="horario-apertura">
                  <label>Horario de Apertura</label>
                  <input 
                    type="time" 
                    className="campo-horario" 
                    value={horarioApertura}
                    onChange={(e) => setHorarioApertura(e.target.value)}
                  />
                </div>
                <div className="horario-cierre">
                  <label>Horario de Cierre</label>
                  <input 
                    type="time" 
                    className="campo-horario" 
                    value={horarioCierre}
                    onChange={(e) => setHorarioCierre(e.target.value)}
                  />
                </div>
                <div className="horario-oferta">
                  <label>Horario de Oferta</label>
                  <input 
                    type="time" 
                    className="campo-horario" 
                    value={horarioOferta}
                    onChange={(e) => setHorarioOferta(e.target.value)}
                  />
                </div>
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

export default AddNegocio;
