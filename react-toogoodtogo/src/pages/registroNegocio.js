import React, { Component } from "react";
import '../assets/styles/registroNegocio.css';
import burger from '../assets/images/burger.png';
import Cookies from 'js-cookie';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '../assets/images/map-marker-icon.png'; 
import axios from 'axios'; // Importa Axios
import { ToastContainer, toast } from 'react-toastify';
export default class RegistroNegocio extends Component {
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
      latitude: -2.90055,
      longitude: -79.00453,
      showMap: false,
    };
  }

  customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [35, 35],
    iconAnchor: [10, 25],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

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
    const { name, email, telefono, password, passwordConfirm, latitude, longitude} = this.state;
    if(password === passwordConfirm){
      try {
        const response = await axios.post('http://localhost:8000/api/registrar-negocio', {
          nombre_negocio: name,
          email: email,
          telefono: telefono,
          contrasenia: password,
          posicion_x: latitude,
          posicion_y: longitude,
        });

        if (response.status === 201) {
          toast.success('Negocio registrado correctamente', {
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
        console.error('Error al registrar cliente:', error);
        this.setState({ error: true });
      }
    }

  }


  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
        }
      );
    } else {
      console.error('La geolocalización no es soportada por este navegador.');
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const LocationMarker = () => {
      useMapEvents({
        click: (e) => {
          console.log(e.latlng.lat);
          console.log(e.latlng.lng);
          this.setState({
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
          });
        }
      });

      return this.state.latitude && this.state.longitude ? (
        <Marker position={[this.state.latitude, this.state.longitude]} icon={this.customIcon}></Marker>
      ) : null;
    };

    return (
      <div className="containerNegocio">
        <button className="back-button" onClick={() => window.history.back()}>←</button>
        <div className="waves-background"></div>
        <div className="loginForm2">
          <form>
            <h1 className="too-good">Registro de</h1>
            <h1 className="to-go">Negocio</h1>
            <div className="input-box">
                <input
                    placeholder="Nombre del Negocio"
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
                name="email"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Teléfono"
                required
                name="telefono"
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
            
            <button onClick={this.handleSubmit}>Registrarse</button>
            <div className="ubicacionMovil">
              <p>Seleccionar <a href="/">ubicacion</a></p>
            </div>
          </form>
        </div>
        <div className="map-container">
          <div className="ubicacion"><p>Selecciona tu ubicación</p></div>
            <div className="burger-image"></div>
            <div className="map-wrapper">
              <MapContainer center={[-2.90055, -79.00453]} zoom={13}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
              </MapContainer>
            </div>
          </div>

        <div className="footer">
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
