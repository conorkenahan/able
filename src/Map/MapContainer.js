import React from "react";
import { Map, InfoWindow, GoogleApiWrapper, Marker } from "google-maps-react";

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClicked = (mapProps, map, clickEvent) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    const containerStyle = {
      margin: "auto",
      position: "relative",
      width: "75%",
      height: "550px",
    };
    return (
      <div className="googleMapDiv">
        <Map
          className="googleMap"
          google={this.props.google}
          containerStyle={containerStyle}
          initialCenter={{
            lat: 40.718145,
            lng: -73.9817311,
          }}
          zoom={13}
          onClick={this.onMapClicked}
        >
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
          <Marker onClick={this.onMarkerClick} name={"Italian Restaurant"} />
          <Marker
            onClick={this.onMarkerClick}
            name={"Art Museum"}
            position={{ lat: 40.729145, lng: -73.9817311 }}
          />
          <Marker
            onClick={this.onMarkerClick}
            name={"Washington Square Park"}
            position={{ lat: 40.729145, lng: -74 }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
