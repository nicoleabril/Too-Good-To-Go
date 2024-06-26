import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../images/map-marker-icon.png'; 

const MapComponent = () => {
  const locations = [
    { position: [-2.9188998846326286, -79.01474831911743], name: 'McDonalds-Mall del Rio' },
    { position: [-2.9059858414071273, -79.00878647833345], name: 'Pizza Hut-Remigio' },
    { position: [-2.8971779643926445, -79.02216698944804], name: 'KFC-Batan Shopping' }
  ];

  const customIcon = L.icon({
    iconUrl: markerIcon,
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
    </MapContainer>
  );
};

export default MapComponent;
