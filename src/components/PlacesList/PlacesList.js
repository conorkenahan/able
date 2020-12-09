import React from "react";
import Context from "../../Context";
import { Link } from "react-router-dom";

export default class MapContainer extends React.Component {
  static contextType = Context;
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  render() {
    return (
      <div>
        <div className="placesListDiv">
          {this.context.markers.map((marker) => (
            <ul className="placeListNameAndTitle">
              <li className="placeList-title">
                <Link to={`/reviews/${marker.place_id}`}>
                  <h2>{marker.name}</h2>
                </Link>
              </li>
              <li className="placeList-location">
                <p> {marker.vicinity}</p>
              </li>
              {marker.icon ? (
                <li>
                  <img
                    src={marker.icon}
                    className="placeList-icon"
                    alt="icon"
                  />
                </li>
              ) : (
                <></>
              )}
            </ul>
          ))}
        </div>
      </div>
    );
  }
}
