import React from "react";
import StarRatings from "react-star-ratings";

export default class Review extends React.Component {
  render() {
    const { review = {} } = this.props;

    this.componentDidMount = () => {};
    return (
      <section className="review">
        <h1 className="reviewUsername">{review.username}</h1>
        <p className="visitedDate">
          (Visited on a {review.season.toLowerCase()}{" "}
          {review.timeofday.toLowerCase()}.)
        </p>
        <p className="reviewText">{review.reviewbody}</p>
        <StarRatings
          rating={review.rating}
          starRatedColor="rgb(65, 91, 196)"
          name="rating"
          numberOfStars={5}
          starDimension="30px"
        />
        <p className="reviewDate">
          {new Date(review.reviewdate).toLocaleDateString()}
        </p>
      </section>
    );
  }
}
