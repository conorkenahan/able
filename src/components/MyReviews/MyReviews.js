import React from "react";
import config from "../../config";
import TokenService from "../../services/token-service";
import Review from "../Review/Review";

export default class MyReviews extends React.Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    fetch(`${config.ABLE_API_ENDPOINT}/reviews/by_user`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((reviews) => {
        this.setState({ reviews });
      });
  }
  render() {
    return (
      <section>
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
    );
  }
}
