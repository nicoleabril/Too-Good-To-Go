import React, { Component } from "react";
import '../assets/styles/registroUsuario.css';
import burger from '../assets/images/burger.png';
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';
export default class RegistroCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        email: '',
        telefono:'',
        password: '',
        passwordConfirm: '',
        rol: '',
        token: Cookies.get('authToken'),
        isLoggedIn: false,
        currentImageIndex: 0,
        error: false,
    };
  }

  userData = [
    {
      username: "nico@correo.com",
      password: "nico123",
      rol: "admin"
    },
    {
      username: "cami@correo.com",
      password: "cami123",
      rol: "cliente"
    },
    {
      username: "emi@correo.com",
      password: "emi123",
      rol: "negocio"
    },
    // Agrega más usuarios si lo deseas
  ];

  handleError = () => {
    this.setState({ error: true });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, telefono, password, passwordConfirm } = this.state;

    if(password === passwordConfirm){
      try {
        const response = await axios.post('http://localhost:8000/api/registrar-cliente', {
          nombre: name,
          email: email,
          telefono: telefono,
          contrasenia: password,
        });

        if (response.status === 201) {
          toast.success('Cliente registrado correctamente', {
            onClose: () => {
              // Volver atrás en el historial después de que se cierre el toast
              window.location.href = '/Login';
            }
          });
        } else {
          toast.error("Datos Incorrectos")
          // Manejar otros casos de respuesta (por ejemplo, errores de validación)
          this.setState({ error: true });
        }
      } catch (error) {
        toast.error("Error al registrar cliente")
        console.error('Error al registrar cliente:', error);
        this.setState({ error: true });
      }
    }

  }


  render() {
    return (
      <div className="containerRegistro">
        <button className="back-button" onClick={() => window.history.back()}>←</button>
        <div className="waves-background"></div>
        <div className="loginForm">
          <form>
            <h1 className="too-good">Registro de</h1>
            <h1 className="to-go">Cliente</h1>
            <div className="input-box2">
                <input
                    placeholder="Nombre Completo"
                    required
                    name="name"
                    onChange={this.handleInputChange}
                />
            </div>
            <div className="input-box2">
              <input
                type="email"
                placeholder="Correo Electrónico"
                required
                name="email"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="input-box2">
              <input
                placeholder="Teléfono"
                required
                name="telefono"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="password-container">
                <div className="input-box2">
                <input
                    type="password"
                    placeholder="Contraseña"
                    required
                    name="password"
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleEnterPress}
                />
                </div>
                <div className="input-box2">
                    <input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        required
                        name="passwordConfirm"
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleEnterPress}
                    />
                </div>
            </div>
            <button onClick={this.handleSubmit} id="botonRegistro">Registrarse</button>
            <div className="new-account">
              <p>¿Ya tienes una cuenta? <a href="/Login">Inicia Sesión</a></p>
            </div>
          </form>
        </div>
        <div className="imagenLogin">
          <img src={burger} alt="Hamburguesa" className="imagen" />
        </div>
        <div className="footer2">
          <div className="textoFooter">
            Copyright © 2024 Too Good To Go International. All Rights Reserved.
          </div>
        </div>
        <ToastContainer
            closeButtonStyle={{
                fontSize: '10px', // Tamaño de fuente del botón de cerrar
                padding: '4px'    // Espaciado interno del botón de cerrar
            }}
            style={{ width: '400px' }} // Ancho deseado para ToastContainer
          />
      </div>
    );
  }
}
