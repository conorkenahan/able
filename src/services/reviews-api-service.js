import TokenService from "./token-service";
import config from "../config";

const reviewsApiService = {
  addReview(place_id, username, season, timeOfDay, reviewBody, rating) {
    return (
      fetch(`${config.API_ENDPOINT}/reviews`),
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
          place_id: place_id,
          username: username,
          season: season,
          timeOfDay: timeOfDay,
          reviewBody: reviewBody,
          rating: rating,
        }),
      }
    );
  },
};

export default reviewsApiService;
