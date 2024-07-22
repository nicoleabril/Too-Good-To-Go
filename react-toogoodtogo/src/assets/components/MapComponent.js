import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../images/map-marker-icon.png'; 
import userMarkerIcon from '../images/marker_user.png'; // Asegúrate de tener un ícono diferente para el usuario
import axios from 'axios';
import Cookies from 'js-cookie';

const MapComponent = ({ locations, user }) => {
  const idUsuario = Cookies.get('id');

  const enviarCoordenadas = async () => {
    try {

      const formData = new FormData();
      formData.append('posicion_x', user.latitud);
      formData.append('posicion_y', user.longitud);
      const response = await axios.post(`http://localhost:8000/api/clientes/${idUsuario}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if(user && user.latitud && user.longitud){
      enviarCoordenadas();
    }

  }, []);


  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [35, 35],
    iconAnchor: [10, 25],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  const userIcon = L.icon({
    iconUrl: userMarkerIcon,
    iconSize: [35, 35],
    iconAnchor: [10, 25],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  return (
    <MapContainer center={[-2.9188998846326286, -79.01474831911743]} zoom={15} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={location.position} icon={customIcon}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
      {user && user.latitud && user.longitud && (
        <Marker position={[user.latitud, user.longitud]} icon={userIcon}>
          <Popup>Tu ubicación</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};
export default MapComponent;
