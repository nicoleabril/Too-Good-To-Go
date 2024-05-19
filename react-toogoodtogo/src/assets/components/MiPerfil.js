import React, { useState } from 'react';
import '../styles/mi-perfil.css';

function MiPerfil() {
    const [imageSrc, setImageSrc] = useState(null);
    const [selectedCuadro, setSelectedCuadro] = useState(null);
    const [nombre, setNombre] = useState('Camila Granda'); 
    const [password, setPassword] = useState('cami123');
    const [isEditable, setIsEditable] = useState(false); 

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImageSrc(e.target.result);
        };

        reader.readAsDataURL(file);
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

    const handleActualizarPerfilClick = () => {
        setIsEditable(!isEditable); 
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
                                <img src={imageSrc} alt="Foto de perfilProducto" className="perfil-imagen" />
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
                            {isEditable ? 'Guardar Cambios' : 'Actualizar Perfil'} {/* Cambiar el texto del botón */}
                        </button>
                    </div>
                    <div className="perfil-cuadros">
                        <div
                            className={`perfil-cuadro ${selectedCuadro === 'ofertas' ? 'selected' : ''}`}
                            onClick={() => handleCuadroClick('ofertas')}
                        >
                            <h2>Ofertas Salvadas</h2>
                            <p>12</p>
                        </div>
                        <div
                            className={`perfil-cuadro ${selectedCuadro === 'compras' ? 'selected' : ''}`}
                            onClick={() => handleCuadroClick('compras')}
                        >
                            <h2>Compras</h2>
                            <p>23</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="contenedorFooter-perfil">
                <div className="textoFooter2">
                    Copyright © 2024 Too Good To Go International. All Rights Reserved.
                </div>
            </footer>
            <div className="waves-background2-perfil"></div>
        </div>
    );
}

export default MiPerfil;
