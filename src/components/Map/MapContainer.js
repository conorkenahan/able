import React from "react";
import { Map, InfoWindow, GoogleApiWrapper, Marker } from "google-maps-react";
import Context from "../../Context";
import { BrowserRouter, Link } from "react-router-dom";

export class MapContainer extends React.Component {
  static contextType = Context;
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker) => {
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
          // ^ potentially make fixed map?
          onReady={this.handleMapReady}
          initialCenter={{
            lat: 40.670869,
            lng: -73.961961,
          }}
          zoom={14}
          onClick={this.onMapClicked}
        >
          {this.context.markers.map((marker, i) => (
            <Marker
              key={i}
              onClick={this.onMarkerClick}
              name={marker.name}
              place_id={marker.place_id}
              position={{
                lat: marker.geometry.location.lat,
                lng: marker.geometry.location.lng,
              }}
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <BrowserRouter>
                <Link
                  to={`/reviews/${this.state.selectedPlace.place_id}`}
                  className="markerTitle"
                >
                  {this.state.selectedPlace.name}
                </Link>
              </BrowserRouter>
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
