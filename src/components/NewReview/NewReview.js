import React from "react";
import StarRatings from "react-star-ratings";
import config from "../../config";
import TokenService from "../../services/token-service";

export default class NewReview extends React.Component {
  state = {
    rating: 0,
    season: "Spring",
    timeOfDay: "Morning",
    reviewText: "Leave review here",
    error: false,
  };

  changeRating = (newRating) => {
    this.setState({
      rating: newRating,
    });
  };

  handleSeasonChange = (changeSeason) => {
    this.setState({
      season: changeSeason.target.value,
    });
  };
  handleTimeChange = (changeTime) => {
    this.setState({
      timeOfDay: changeTime.target.value,
    });
  };

  submitReview = (e) => {
    e.preventDefault();
    const { season, timeOfDay, reviewBody } = e.target;
    fetch(`${config.ABLE_API_ENDPOINT}/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        placeid: this.props.placeid,
        season: season.value,
        timeofday: timeOfDay.value,
        reviewbody: reviewBody.value,
        rating: this.state.rating,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.reRenderComponent(res);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {}

  render() {
    const { error } = this.state;
    const seasons = ["Spring", "Summer", "Fall", "Winter"];
    const timesOfDay = ["Morning", "Afternoon", "Evening", "N/A"];
    return (
      <section>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <form
          id="reviewForm"
          className="reviewForm"
          onSubmit={this.submitReview}
        >
          <fieldset>
            <h3>Leave Review</h3>
            <p>
              Please leave as many details as possible, including the month and
              time of day you visited, to help users understand your experience
              at this place.
            </p>
            <p className="subtext">
              For example: "This trail was great, but even in my motorized
              wheelchair, I found it difficult to navigate..."
            </p>
            <h4>Season of your visit:</h4>
            <div className="radioOptions">
              {seasons.map((season, i) => {
                return (
                  <div
                    key={i}
                    className={
                      "radioButton" +
                      " " +
                      (this.state.season === `${season}` ? "checked" : "")
                    }
                  >
                    <label className={`${season} + radioLabel`}>
                      <input
                        type="radio"
                        value={season}
                        name="season"
                        className="hidden"
                        checked={this.state.season === `${season}`}
                        onChange={this.handleSeasonChange}
                      />
                      {season}
                    </label>
                  </div>
                );
              })}
            </div>
            <h4>Time of day of your visit:</h4>
            <div className="radioOptions">
              {timesOfDay.map((timeOfDay, i) => {
                return (
                  <div
                    key={i}
                    className={
                      "radioButton" +
                      " " +
                      (this.state.timeOfDay === `${timeOfDay}` ? "checked" : "")
                    }
                  >
                    <label className={`${timeOfDay} + radioLabel`}>
                      <input
                        type="radio"
                        value={timeOfDay}
                        name="timeOfDay"
                        className="hidden"
                        checked={this.state.timeOfDay === `${timeOfDay}`}
                        onChange={this.handleTimeChange}
                      />
                      {timeOfDay}
                    </label>
                  </div>
                );
              })}
            </div>
            <h4>Star Rating:</h4>
            <StarRatings
              rating={this.state.rating}
              starRatedColor="rgb(65, 91, 196)"
              starHoverColor="rgb(65, 91, 196)"
              changeRating={this.changeRating}
              name="rating"
              numberOfStars={5}
              starDimension="30px"
            />
            <textarea
              type="text"
              name="reviewBody"
              className="reviewBody"
              placeholder={this.state.reviewText}
              required
            ></textarea>
            <input type="submit" value="Submit"></input>
          </fieldset>
        </form>
      </section>
    );
  }
}
