import React from "react";
import "./index.css";
import { Route, Link } from "react-router-dom";
import Context from "./Context";
import MapContainer from "./Map/MapContainer";
import prospectpark from "./images/prospectpark.jpg";
import StarRatings from "react-star-ratings";

export default class App extends React.Component {
  state = {
    rating: 0,
    changeRating: (newRating) => {
      this.setState({
        rating: newRating,
      });
    },
  };

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
              <p className="subtext">(not all markers are working)</p>
            </section>
            <section>
              {/* <LocationSearch /> */}
              <MapContainer />
            </section>
            <Link className="submitButton" to="/reviews/locationid">
              see example reviews
            </Link>
            <Link className="submitButton" to="/reviews/newreview">
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
          <Route path="/reviews/locationid">
            <div className="placeReviews">
              <div>
                <h1>Prospect Park</h1>
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
              <li className="userReview">
                <h3>User2</h3>
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
            </ul>
          </Route>
          <Route path="/reviews/newreview">
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
