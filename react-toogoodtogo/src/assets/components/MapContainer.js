import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: 37.774929,
          lng: -122.419416
        }}
      >
        <Marker position={{ lat: 37.774929, lng: -122.419416 }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'TU_API_KEY'
})(MapContainer);
