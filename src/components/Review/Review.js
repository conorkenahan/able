import React from "react";
import StarRatings from "react-star-ratings";
import TokenService from "../../services/token-service";
import config from "../../config";
import { Link } from "react-router-dom";

export default class Review extends React.Component {
  static defaultProps = {
    getReviews: () => {},
    getReviewsByUser: () => {},
  };

  state = {
    userid: [],
  };

  deleteReview = () => {
    this.props.getReviews();
    this.props.getReviewsByUser();
    fetch(`${config.ROAM_API_ENDPOINT}/reviews`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        reviewid: this.props.review.id,
        userid: this.props.review.userid,
      }),
    })
      .then((res) => {
        this.props.getReviews();
        this.props.getReviewsByUser();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  getUserId = () => {
    fetch(`${config.ROAM_API_ENDPOINT}/users/userid`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok
          ? res
              .json()
              .then((e) => Promise.reject(e))
              .then(this.setState({ userid: false }))
          : res.json()
      )
      .then((userid) => {
        this.setState({ userid });
      });
  };

  componentDidMount() {
    this.getUserId();
  }

  render() {
    const { review = {} } = this.props || {};
    return (
      <section className="review">
        <h1 className="reviewUsername">{review.username}</h1>
        {review.placeid ? (
          <h2 className="reviewPlacename">
            <Link to={`/reviews/${review.placeid}`} className="placeLink">
              {review.placename}
            </Link>
          </h2>
        ) : (
          <h2 className="reviewPlacename">{review.placename}</h2>
        )}

        {review.season && review.timeofday ? (
          <p className="visitedDate">
            (Visited on a {review.season.toLowerCase()}{" "}
            {review.timeofday.toLowerCase()}.)
          </p>
        ) : (
          <></>
        )}

        <p className="reviewText">{review.reviewbody}</p>
        <StarRatings
          rating={review.rating}
          starRatedColor="#2d2dea"
          starEmptyColor="#727272"
          name="rating"
          numberOfStars={5}
          starDimension="30px"
        />
        <p className="reviewDate">
          {new Date(review.reviewdate).toLocaleDateString()}
        </p>
        {this.state.userid ? (
          <button className="deleteReview" onClick={() => this.deleteReview()}>
            Delete Review
          </button>
        ) : (
          <></>
        )}
      </section>
    );
  }
}
