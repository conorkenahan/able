import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import Review from "../Review/Review";
import NewReview from "../NewReview/NewReview";
import TokenService from "../../services/token-service";

export default class PlaceReviews extends Component {
  state = {
    place: {},
    reviews: [],
    error: false,
    rerender: true,
    res: [],
  };

  getReviews() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(
      proxyurl +
        config.PLACE_DETAILS_API_ENDPOINT +
        "place_id=" +
        this.props.match.params.place_id +
        "&fields=name,formatted_address,photo,icon&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ place: res.result });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
    fetch(
      config.ABLE_API_ENDPOINT + "/reviews/" + this.props.match.params.place_id
    )
      .then((res) => res.json())
      .then((reviews) => {
        this.setState({ reviews });
      });
  }

  componentDidMount() {
    this.getReviews();
  }

  render() {
    return (
      <>
        {this.state.error ? (
          <>
            <p className="errorMessage">
              Oops! Something went wrong. Make sure you're connected to the
              internet.
            </p>
          </>
        ) : (
          <>
            {this.state.place ? (
              <div className="placeDescription">
                <div>
                  <h1 className="placeTitle">{this.state.place.name}</h1>
                  <img
                    src={this.state.place.icon}
                    className="placeIcon"
                    alt="icon"
                  />
                  <p className="placeAddress">
                    {this.state.place.formatted_address}
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}

        <section className="place">
          {TokenService.hasAuthToken() ? (
            <div className="newReviewContainer">
              <NewReview
                placeid={this.props.match.params.place_id}
                getReviews={() => this.getReviews()}
              />
            </div>
          ) : (
            <div className="loginReminder">
              <h2>Login to leave a review!</h2>
              <Link className="submitButton" to="/login">
                Log in
              </Link>
            </div>
          )}

          <section className="placeReviews">
            <ul>
              {this.state.reviews.map((review, i) => {
                return (
                  <li key={i}>
                    <Review review={review} />
                  </li>
                );
              })}
            </ul>
          </section>
        </section>
      </>
    );
  }
}
