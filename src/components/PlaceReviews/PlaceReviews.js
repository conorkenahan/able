import React, { Component } from "react";
import config from "../../config";
import Review from "../Review/Review";
import NewReview from "../NewReview/NewReview";

export default class PlaceReviews extends Component {
  state = {
    place: {},
    reviews: [],
    error: false,
  };

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  componentDidMount() {
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
          {/* <Link
            to={`/newreview/${this.props.match.params.place_id}`}
            className="leaveReviewButton"
          >
            Leave a review
          </Link> */}
          <div className="newReviewContainer">
            <NewReview placeid={this.props.match.params.place_id} />
          </div>
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
