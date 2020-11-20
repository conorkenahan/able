import React from "react";
import config from "../../config";
import TokenService from "../../services/token-service";
import Review from "../Review/Review";

export default class MyReviews extends React.Component {
  state = {
    reviews: [],
  };

  getReviewsByUser() {
    fetch(`${config.ROAM_API_ENDPOINT}/reviews/by_user`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((reviews) => {
        this.setState({ reviews });
      });
  }

  componentDidMount() {
    this.getReviewsByUser();
  }
  render() {
    return (
      <section>
        <section className="myReviews">
          {this.state.reviews.length > 0 ? (
            <ul>
              <h1>Your Reviews:</h1>
              {this.state.reviews.map((review, i) => {
                return (
                  <li key={i}>
                    <Review
                      review={review}
                      getReviewsByUser={() => this.getReviewsByUser()}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <>
              <h2>Your saved reviews will show here!</h2>
            </>
          )}
        </section>
      </section>
    );
  }
}
