import React, { Component } from "react";
import '../assets/styles/login.css'
import { FaCircleUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import burger from '../assets/images/burger.png';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de envío del formulario
    console.log('Formulario enviado');
  }

  render() {
    return (
      <div className="container">
        <div className="waves-background"></div>
        <div className="loginForm">
          <form onSubmit={this.handleSubmit}>
            <h1 className="too-good">Too Good</h1>
            <h1 className="to-go">To Go</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="Correo Electrónico"
                required
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
              <FaCircleUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Contraseña"
                required
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <RiLockPasswordFill className="icon" />
            </div>
            <div className="forgot-password">
              <a href="#">¿Olvidaste la Contraseña?</a>
            </div>
            <button type="submit">Iniciar Sesión</button>
            <div className="new-account">
              <p>¿Eres nuevo aquí? <a href="#">Crear cuenta</a></p>
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
