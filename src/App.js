import React from "react";
import "./index.css";
import { Route, Link } from "react-router-dom";
import Context from "./Context";
// import config from "./config";
import MapContainer from "./Map/MapContainer";
import prospectpark from "./images/prospectpark.jpg";
import StarRatings from "react-star-ratings";

export default class App extends React.Component {
  state = {
    markers: [
      {
        name: "Prospect Park",
        location: {
          lat: 40.6602037,
          lng: -73.9689558,
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png",
        photo_reference:
          "CmRaAAAALlr70zBItTwT6ZiovqPuKX3Rhyto_qLOFhHpm05pdwX-2LqW_bE6pYRALqJLuDmQBrNWYjWiXH6D3g1OtFhVsCk6LKxj2UpHrwGcVOplSnhjJrpPIcx4BYkUHt5iZV3tEhBhRIgVca8O_YA6v_w68y-pGhTZpYZSro6uWa79UmVeGKTlRmIH7w",
        place_id: "ChIJQwRohxBbwokRmHrfAMb3ixc",
      },
      {
        name: "Prospect Park Zoo",
        location: {
          lat: 40.6657246,
          lng: -73.9644911,
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
        photo_reference:
          "CmRaAAAAqzPYB7C7JQ7NtP9Z9qp6AIQQS79VBNa2ag6VijPd-ECvnUIzKHqHon8vnv7IoHjGBAEMO4_mPuc_fsd4vI-axvbrArmRJCYGkW6VOU33ViYJeT7Ya4nTnQA0g1lNiwBZEhDUQItMFVlhY3Di2saqBwlHGhRplZcBE5Jo6e7WySrW4-X9kwxdvQ",
        place_id: "ChIJnWjS-wRbwokRpCq5RGEIH3E",
      },
      {
        name: "Brooklyn Botanic Garden",
        location: {
          lat: 40.66951,
          lng: -73.9625044,
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png",
        photo_reference:
          "CmRaAAAAfDWnTLMF9ni3PmKu55dbodUHNZxh5khRoHOqVF08UK_4hmsKvmZjiElSbRNFzgF9kK__swLirkpti2J7SsL0u9RHhteM87eU2GMSwFouiWQ9iBlpcuPZ2wr-ForWACEcEhDG24q5_GQsRG-bgcZe_pR4GhRFjbnAPFh38nVI_N8PpTQKJb0h8A",
        place_id: "ChIJwYu_aA5bwokR2lxjW-QvQlc",
      },
      {
        name: "Brooklyn Museum",
        location: {
          lat: 40.6712062,
          lng: -73.9636306,
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/museum-71.png",
        photo_reference:
          "CmRaAAAAfDWnTLMF9ni3PmKu55dbodUHNZxh5khRoHOqVF08UK_4hmsKvmZjiElSbRNFzgF9kK__swLirkpti2J7SsL0u9RHhteM87eU2GMSwFouiWQ9iBlpcuPZ2wr-ForWACEcEhDG24q5_GQsRG-bgcZe_pR4GhRFjbnAPFh38nVI_N8PpTQKJb0h8A",
        place_id: "ChIJwYu_aA5bwokR2lxjW-QvQlc",
      },
      {
        name: "Chuko",
        location: {
          lat: 40.6807746,
          lng: -73.9674534,
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        photo_reference:
          "CmRaAAAAJFzXza6GskXDbo9j2zpPTzHOLxmx68xYNxbAvyGTwpLeLV9Jre3SpVBxqaEyhiPpyqLPbdQtx7N4KoVFRhmjwh74bt9nWLQRNpLxSp0eE19IdO9mgKa2lOY4dCKoRZMEEhBIU7mJ8FfR4-KYq3ep6zTNGhQtwsCf8PQ_TbfLkK_Qnru-dF8GIA",
        place_id: "ChIJd8Z4NaRbwokRwSX1ZmI52Ys",
      },
      {
        name: "Brooklyn Public Library - Central Branch",
        location: {
          lat: 40.6712062,
          lng: -73.9636306,
        },
        icon:
          "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png",
        photo_reference:
          "CmRaAAAAAqC_WbSTzRDqPYMdAOC9o4lLM9ijv7OVuSw0OjrQ3-lI-pNgVTL2S_nEiL-P-_Ynb9VibkMj3JI0eySEbeKrc96dXrlftm9Eqf_N_okodZ1yIj_vKHpKOcxASYBqn1DmEhBQOiCTx6jLjo48eayyChdRGhRHzlfFft4pdeXMZf1uR0q3-Vyieg",
        place_id: "ChIJzYGq1AlbwokR5rnEbWm1UxA",
      },
    ],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},

    onMarkerClick: (props, marker) => {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
      });
    },

    rating: 0,
    changeRating: (newRating) => {
      this.setState({
        rating: newRating,
      });
    },
  };

  // componentDidMount() {
  //   fetch(
  //     config.PLACES_API_ENDPOINT +
  //       "location=40.670869,-73.961961&radius=1500&key=" +
  //       process.env.REACT_APP_GOOGLE_API_KEY,
  //     { mode: "no-cors" }
  //   ).then((res) => {
  //     console.log(res);
  //   });
  // }

  render() {
    return (
      <Context.Provider value={this.state}>
        <main className="App">
          <nav>
            <Link className="ableLink" to="/">
              Able
            </Link>
            <br />
            <Link className="registerLink" to="/register">
              Register
            </Link>
            {" - "}
            <Link className="loginLink" to="/login">
              Login
            </Link>
          </nav>
          <Route exact path="/">
            <section className="description">
              <h4>
                Able helps you find locations that are accessible for YOUR
                needs.
              </h4>
              <p>View reviews of your favorite, or new, locations below!</p>
              <p className="subtext">
                (all marker links currently lead to same review page)
              </p>
            </section>
            <section>
              {/* <LocationSearch /> */}
              <MapContainer />
            </section>
            <Link className="submitButton" to="/reviews/:locationid">
              see example reviews
            </Link>
            <Link className="submitButton" to="/newreview">
              leave review
            </Link>
          </Route>
          <Route path="/register">
            <h1>Sign Up!</h1>
            <form className="signupForm">
              <div className="full_name">
                <label htmlFor="signupForm__full_name">Name: </label>
                <input type="text" name="name" id="signupName" required></input>
              </div>
              <div className="user_name">
                <label htmlFor="signupForm__user_name">Username: </label>
                <input
                  type="text"
                  name="username"
                  id="signupUsername"
                  required
                ></input>
              </div>
              <div className="password">
                <label htmlFor="signupForm__password">Password: </label>
                <input
                  type="password"
                  name="password"
                  id="signupPassword"
                  required
                ></input>
              </div>
              <div className="email">
                <label htmlFor="signupForm__nick_name">Email: </label>
                <input
                  type="email"
                  name="email"
                  id="signupEmail"
                  required
                ></input>
              </div>
              <button className="submitSignup">Submit</button>{" "}
            </form>
          </Route>
          <Route path="/login">
            <h1>Login!</h1>
            <form className="LoginForm">
              <div className="username">
                <label htmlFor="LoginForm__username">Username: </label>
                <input
                  required
                  name="username"
                  id="LoginForm__username"
                ></input>
              </div>
              <div className="password">
                <label htmlFor="LoginForm__password">Password: </label>
                <input
                  required
                  name="password"
                  type="password"
                  id="LoginForm__password"
                ></input>
              </div>
              <button className="submitLogin" type="submit">
                Login
              </button>
            </form>
          </Route>
          <Route path={`/reviews/:${this.state.placeName}`}>
            <div className="placeReviews">
              <div>
                <h1>Prospect Park</h1>
                {/* {this.state.selectedPlace.name} is not working. state is not persisting */}
                <p>Park in Brooklyn, New York</p>
                <p></p>
              </div>
              <img
                src={prospectpark}
                alt="prospect park"
                className="prospectParkImage"
              ></img>
            </div>
            <ul>
              <li className="userReview">
                <h3>User1</h3>
                <p className="reviewDate">June 4, 2020</p>
                <StarRatings
                  rating={3}
                  starRatedColor="rgb(65, 91, 196)"
                  changeRating={this.changeRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="30px"
                />
                <p>
                  I use a wheelchair and found the uneven paths to be rather
                  difficult to navigate.
                </p>
              </li>
              <li className="userReview">
                <h3>User2</h3>
                <p className="reviewDate">August 21, 2020</p>
                <StarRatings
                  rating={5}
                  starRatedColor="rgb(65, 91, 196)"
                  changeRating={this.changeRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="30px"
                />
                <p>
                  {" "}
                  I often struggle with loud noises in public places but I found
                  this park to be very quiet and peaceful.
                </p>
              </li>
            </ul>
          </Route>
          <Route path="/newreview">
            <form id="reviewForm" className="reviewForm">
              <p className="subtext">(will require user to be logged in)</p>
              <h3>Leave Review: </h3>
              <p>
                Please leave as many details as possible to help users
                understand your experience at this place.
              </p>
              <p className="subtext">
                For example: "This trail was great, but even in my motorized
                wheelchair, I found it difficult to navigate..."
              </p>
              <StarRatings
                rating={this.state.rating}
                starRatedColor="rgb(65, 91, 196)"
                starHoverColor="rgb(65, 91, 196)"
                changeRating={this.state.changeRating}
                name="rating"
                numberOfStars={5}
                starDimension="30px"
              />
              <textarea type="text" className="reviewBody"></textarea>
              <button className="submitButton">Submit</button>
              <p>(submit currently not working)</p>
            </form>
          </Route>
        </main>
      </Context.Provider>
    );
  }
}
