import React, { Component } from "react";
import '../assets/styles/registroUsuario.css';
import burger from '../assets/images/burger.png';
import Cookies from 'js-cookie';

export default class RegistroCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        username: '',
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const user = this.userData.find(user => user.username === username && user.password === password);

    if (user) {
      // Si el usuario existe, establecer el estado correspondiente
      this.setState({
        rol: user.rol,
        isLoggedIn: true,
        error: false,
        token: 'mockToken123' // Podrías generar un token aquí si lo necesitas
      });

      // Simular almacenamiento del token en cookies
      Cookies.set('authToken', 'mockToken123');
      Cookies.set('usr', username);
      Cookies.set('rol', user.rol);

      // Redirigir según el rol después de la autenticación
      if (user.rol === 'cliente') {
        window.location.href = '/Inicio';
      } else if (user.rol === 'negocio') {
        window.location.href = '/Restaurante';
      } else {
        window.location.href = '/Inicio'; // Redirección por defecto
      }
    } else {
      // Si el usuario no existe, mostrar error
      this.setState({
        error: true
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="waves-background"></div>
        <div className="loginForm">
          <form>
            <h1 className="too-good">Registro de</h1>
            <h1 className="to-go">Cliente</h1>
            <div className="input-box">
                <input
                    placeholder="Nombre Completo"
                    required
                    name="name"
                    onChange={this.handleInputChange}
                />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Correo Electrónico"
                required
                name="username"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Teléfono"
                required
                name="username"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="password-container">
                <div className="input-box">
                <input
                    type="password"
                    placeholder="Contraseña"
                    required
                    name="password"
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleEnterPress}
                />
                </div>
                <div className="input-box">
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
        <div className="footer">
          <div className="textoFooter">
            Copyright © 2024 Too Good To Go International. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }
}
