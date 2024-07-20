import React, { Component } from "react";
import '../assets/styles/login.css';
import { FaCircleUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import burger from '../assets/images/burger.png';
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa Axios

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rol: '',
      token: Cookies.get('XSRF-TOKEN'),
      isLoggedIn: false,
      currentImageIndex: 0,
      error: false,
    };
  }

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
    const { username, password } = this.state;

    try {
      
      // Realizar la solicitud POST al endpoint de login
      const response = await axios.post('http://localhost:8000/api/login', {
        email: username,
        contrasenia: password,
      });
      const response_rol = await axios.get(`http://localhost:8000/api/usuarios_email/${username}`);
      this.setState({
        rol: response_rol.data.tipo_usuario,
        token: response.data.token,
        isLoggedIn: true,
        error: false, // Reiniciar el estado de error a false
      });
      Cookies.set('authToken', this.state.token);
      Cookies.set('id', response_rol.data.id_usuario);
      Cookies.set('usr', username);
      Cookies.set('rol', response_rol.data.tipo_usuario)

      const { data } = response;

      if (response.status === 200 && data.message === 'Ingreso de Usuario Exitoso') {
        // Actualizar el estado del componente con el rol y el token
        this.setState({
          rol: Cookies.get('rol'),
          isLoggedIn: true,
          error: false,
          token: Cookies.get('authToken'),
        });

        // Redirigir según el rol después de la autenticación
        if (Cookies.get('rol') === 'Cliente') {
          window.location.href = '/Inicio';
        } else if (Cookies.get('rol') === 'Negocio') {
          window.location.href = '/Inicio-Negocio';
        } else {
          window.location.href = '/Inicio'; // Redirección por defecto
        }
      } else {
        // Si el servidor responde con 419 (Page Expired) o cualquier otro error
        // muestra un mensaje de error específico para el usuario
        if (response.status === 419) {
          alert('Usuario no existe');
        } else {
          this.setState({ error: true });
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejo de otros errores, si es necesario
      this.setState({ error: true });
    }
  }


  render() {
    return (
      <div className="containerLogin">
        <button className="back-button" onClick={() => window.history.back()}>←</button>
        <div className="waves-background"></div>
        <div className="loginForm">
          <form>
            <h1 className="too-good">Too Good</h1>
            <h1 className="to-go">To Go</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="Correo Electrónico"
                required
                name="username"
                onChange={this.handleInputChange}
              />
              <FaCircleUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Contraseña"
                required
                name="password"
                onChange={this.handleInputChange}
                onKeyDown={this.handleEnterPress}
              />
              <RiLockPasswordFill className="icon" />
            </div>
            <div className="forgot-password">
              <a href="#">¿Olvidaste la Contraseña?</a>
            </div>
            <button onClick={this.handleSubmit}>Iniciar Sesión</button>
            <div className="new-account">
              <p>¿Eres nuevo aquí? <a href="/Registro">Crear cuenta</a></p>
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
