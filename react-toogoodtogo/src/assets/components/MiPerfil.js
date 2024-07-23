import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styles/mi-perfil.css';
import { ToastContainer, toast } from 'react-toastify';

function MiPerfil() {
    const [imageFile, setImageFile] = useState(null); // Para imágenes nuevas a subir
    const [imageSrc, setImageSrc] = useState(null);   // Para mostrar la imagen desde la URL
    const [selectedCuadro, setSelectedCuadro] = useState(null);
    const [nombre, setNombre] = useState(''); 
    const [password, setPassword] = useState('');
    const [originalNombre, setOriginalNombre] = useState('');
    const [originalPassword, setOriginalPassword] = useState('******');
    const [isEditable, setIsEditable] = useState(false);
    const [idUsuario, setIdUsuario] = useState(null);
    const [ofertasSalvadas, setOfertasSalvadas] = useState(0);
    const [compras, setCompras] = useState(0);
    

    useEffect(() => {
        const fetchUserProfile = async () => {
            const id = Cookies.get('id');
            setIdUsuario(id);
            try {
                const response = await axios.get(`http://localhost:8000/api/clientes/${id}`);
                const user = response.data;
                setNombre(user.data.nombre);
                setOriginalNombre(user.data.nombre); // Guardar valor original
                setImageSrc(user.data.foto_perfil);   // Usar URL directamente
                setPassword('******');
                setOriginalPassword('******'); // Contraseña original oculta

                const responseOfertas = await axios.get(`http://localhost:8000/api/ventasCliente/${id}`);
                const ventas = responseOfertas.data.ventas;
                console.log(ventas);
                let totalOferta = 0;
                let totalNormal = 0;
                // Calcular las sumas basadas en el tipo de producto
                ventas.forEach(venta => {
                    if (venta.tipo_producto === 'Oferta') {
                        totalOferta += venta.cantidad;
                    } else if (venta.tipo_producto === 'Normal') {
                        totalNormal += venta.cantidad;
                    }
                });

                setOfertasSalvadas(totalOferta);
                setCompras(totalNormal);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]); // Cambiado a file
        // Puedes mostrar una vista previa aquí si lo deseas
        if (event.target.files[0]) {
            const objectURL = URL.createObjectURL(event.target.files[0]);
            setImageSrc(objectURL);
        }
    };

    const handleCuadroClick = (cuadro) => {
        setSelectedCuadro(cuadro);
    };

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleActualizarPerfilClick = async () => {
        if (isEditable) {
            try {
                const formData = new FormData();
                const formData2 = new FormData();
                formData.append('id_cliente', idUsuario);
                
                // Enviar los datos actualizados
                if (nombre !== originalNombre) {
                    formData.append('nombre', nombre);
                }else{
                    formData.append('nombre', originalNombre);
                }
                if (imageFile) { // Cambiado a imageFile
                    formData.append('foto_perfil', imageFile);
                }

                const response = await axios.post(`http://localhost:8000/api/clientes/${idUsuario}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (password !== '******') {
                    formData2.append('contrasenia', password);
                    const response2 = await axios.post(`http://localhost:8000/api/usuarios-cambio/${idUsuario}`, formData2, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                }
                toast.success('Guardado');
                setOriginalNombre(nombre); // Actualizar el nombre original
                setOriginalPassword(password); // Actualizar la contraseña original si se ha cambiado
                setIsEditable(false);
            } catch (error) {
                toast.error('Error al editar.');
                console.error('Error updating profile:', error);
            }
        } else {
            setIsEditable(true);
        }
    };

    return (
        <div className="main-container-perfil">
            <header className="header-perfil">
                <h1>Mi Perfil</h1>
            </header>
            <main className="perfil-container">
                <div className="perfil-formulario">
                    <div className="perfil-foto">
                        <div className="foto-preview">
                            {imageSrc ? (
                                <img src={imageSrc} alt="Foto de perfil" className="perfil-imagen" />
                            ) : (
                                <div className="image-placeholder">Ingrese Foto</div>
                            )}
                        </div>
                        <div className="image-upload-container">
                            <input
                                type="file"
                                id="file-input"
                                className="imagenIngresada"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="file-input" className="btn_subirFoto_Perfil">
                                Subir Imagen
                            </label>
                        </div>
                    </div>
                    <div className="perfil-campos">
                        <div className="perfil-campo">
                            <label htmlFor="nombre">Nombre(s)</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                className="campo-input" 
                                value={nombre}
                                onChange={handleNombreChange}
                                disabled={!isEditable} 
                            />
                        </div>
                        <div className="perfil-campo">
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className="campo-input" 
                                value={password}
                                onChange={handlePasswordChange}
                                disabled={!isEditable} 
                            />
                        </div>
                        <button 
                            className="btn_actualizarPerfil" 
                            onClick={handleActualizarPerfilClick}
                        >
                            {isEditable ? 'Guardar Cambios' : 'Actualizar Perfil'}
                        </button>
                        {isEditable && (
                            <button 
                                className="btn_cancelarPerfil" 
                                onClick={() => {
                                    // Restablecer campos a los valores originales
                                    setNombre(originalNombre);
                                    setPassword('******');
                                    setIsEditable(false);
                                }}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                    <div className="perfil-cuadros">
                        <div
                            className={`perfil-cuadro ${selectedCuadro === 'ofertas' ? 'selected' : ''}`}
                            onClick={() => handleCuadroClick('ofertas')}
                        >
                            <h2>Ofertas Salvadas</h2>
                            <p>{ofertasSalvadas}</p>
                        </div>
                        <div
                            className={`perfil-cuadro ${selectedCuadro === 'compras' ? 'selected' : ''}`}
                            onClick={() => handleCuadroClick('compras')}
                        >
                            <h2>Compras</h2>
                            <p>{compras}</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="contenedorFooter-perfil">
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
            <div className="waves-background2-perfil"></div>
        </div>
    );
}

export default MiPerfil;
