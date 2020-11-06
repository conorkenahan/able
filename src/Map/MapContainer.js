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

  handleMapReady(mapProps, map) {
    map.setOptions({
      draggableCursor: "default",
      draggingCursor: "pointer",
    });
  }

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
          // draggable={false}
          onReady={this.handleMapReady}
          initialCenter={{
            lat: 40.670869,
            lng: -73.961961,
          }}
          zoom={14}
          onClick={this.onMapClicked}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={"Prospect Park"}
            position={{ lat: 40.6602037, lng: -73.9689558 }}
          />
          <Marker
            onClick={this.onMarkerClick}
            name={"Prospect Park Zoo"}
            position={{ lat: 40.6657246, lng: -73.9644911 }}
          />
          <Marker
            onClick={this.onMarkerClick}
            name={"Brooklyn Botanic Garden"}
            position={{ lat: 40.66951, lng: -73.9625044 }}
          />
          <Marker
            onClick={this.onMarkerClick}
            name={"Brooklyn Museum"}
            position={{ lat: 40.6712062, lng: -73.9636306 }}
          />
          <Marker
            onClick={this.onMarkerClick}
            name={"Chuko"}
            position={{ lat: 40.6807746, lng: -73.9674534 }}
          />
          {/* <Marker
            onClick={this.onMarkerClick}
            name={"Maya Taqueria"}
            position={{ lat: 40.67802449999999, lng: -73.9685058 }}
          /> */}
          <Marker
            onClick={this.onMarkerClick}
            name={"Brooklyn Public Library - Central Branch"}
            position={{ lat: 40.67251110000001, lng: -73.9682 }}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
