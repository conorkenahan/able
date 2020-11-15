import React from "react";
import "./index.css";
import { Route } from "react-router-dom";
import Context from "./Context";
import config from "./config";
import MapContainer from "./components/Map/MapContainer";
import PlaceReviews from "./components/PlaceReviews/PlaceReviews";
import NewReview from "./components/NewReview/NewReview";
import MyReviews from "./components/MyReviews/MyReviews";
import RegistrationPage from "./components/Registration/RegistrationPage";
import LoginPage from "./components/Login/LoginPage";
import Nav from "./components/Nav/Nav";

export default class App extends React.Component {
  state = {
    markers: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    mapHidden: true,
    startButtonHidden: false,
    loading: false,
    error: false,
    rerender: {},

    //need to fetch Photo References for each location to display on reviews page

    // handles loading icon
    setLoadingToTrue: (e) => {
      this.setState({ loading: true });
    },
    setLoadingToFalse: () => {
      this.setState({ loading: false });
    },
  };

  componentDidMount() {
    this.setState({ error: false });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    this.setState({
      mapHidden: false,
      startButtonHidden: true,
    });
    fetch(
      proxyurl +
        config.NEARBY_PLACES_API_ENDPOINT +
        "location=40.670869,-73.961961&radius=1500&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ markers: res.results.slice(0, 8) });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(
          "Can’t access " +
            config.NEARBY_PLACES_API_ENDPOINT +
            " response. Blocked by browser?",
          error
        );
      });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <main className="App">
          <Route path="/" component={Nav} />

          <Route exact path="/">
            <section className="description">
              <h2>Able</h2>
              <h4>Find locations that are accessible for YOUR needs.</h4>
              <h5>View reviews of your favorite, or new, locations below!</h5>
            </section>
            {this.state.error ? (
              <>
                <p className="errorMessage">
                  Oops! Something went wrong. Make sure you're connected to the
                  internet.
                </p>
              </>
            ) : (
              <section>
                <MapContainer />
              </section>
            )}
          </Route>

          <Route path="/register" component={RegistrationPage} />
          <Route path="/login" component={LoginPage} />
          <Route exact path="/reviews/:place_id" component={PlaceReviews} />
          <Route path="/newreview/:place_id" component={NewReview} />
          <Route
            path={["/reviews/users/:username", "/myreviews"]}
            component={MyReviews}
          />
        </main>
      </Context.Provider>
    );
  }
}
