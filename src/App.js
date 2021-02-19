import React from "react";
import "./index.css";
import { Route } from "react-router-dom";
import Context from "./Context";
import config from "./config";
import MapContainer from "./components/Map/MapContainer";
import PlacesList from "./components/PlacesList/PlacesList";
import PlaceReviews from "./components/PlaceReviews/PlaceReviews";
import NewReview from "./components/NewReview/NewReview";
import MyReviews from "./components/MyReviews/MyReviews";
import RegistrationPage from "./components/Registration/RegistrationPage";
import LoginPage from "./components/Login/LoginPage";
import Nav from "./components/Nav/Nav";
import TokenService from "./services/token-service";
import title from "./images/roam-title.png";

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
    toggleMap: true,

    //need to fetch Photo References for each location to display on reviews page

    // handles loading icon
    setLoadingToTrue: (e) => {
      this.setState({ loading: true });
    },
    setLoadingToFalse: () => {
      this.setState({ loading: false });
    },

    deleteReview: (e) => {
      e.preventDefault();
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
        .then((res) => res.json())
        .then((res) => {
          this.props.getReviewsByUser();
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    },
  };

  fetchWithTimeout(url, options, timeout = 8000) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout)
      ),
    ]);
  }

  componentDidMount() {
    this.setState({ error: false });
    const proxyurl = "https://thingproxy.freeboard.io/fetch/"
    this.setState({
      mapHidden: false,
      startButtonHidden: true,
    });
    this.fetchWithTimeout(
      proxyurl +
        config.NEARBY_PLACES_API_ENDPOINT +
        "location=40.670869,-73.961961&radius=1500&key=" +
        process.env.REACT_APP_GOOGLE_API_KEY,
      {
        timeout: 6000,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ markers: res.results.slice(0, 8) });
        this.setState({ error: false });
      })
      .catch((error) => {
        this.setState({
          error: true,
        });
        console.log(
          "Can’t access " +
            config.NEARBY_PLACES_API_ENDPOINT +
            " response. Blocked by browser?",
          error
        );
      });
  }

  toggleMap = () => {
    this.setState({ toggleMap: !this.state.toggleMap });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <main className="App">
          <Route path="/" component={Nav} />

          <Route exact path="/">
            <section className="description">
              <img
                src={title}
                className="roamTitle"
                alt="roam title"
                aria-label="roam title"
              ></img>
              <h2 className="descriptionText1">
                Roam is here to help people with disabilities find locations
                that are accessible for their needs.
              </h2>
              <h2 className="descriptionText2">
                The term "accessible" has different meanings to different
                people. Roam is here to act as a community to help anyone share
                their experiences visiting different locations.
              </h2>
              <p></p>
              <h2 className="descriptionText3">
                Click the markers below to view reviews of locations in the
                Brooklyn area!
              </h2>
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
                {this.state.toggleMap ? (
                  <>
                    <button
                      className="toggleMapButton"
                      onClick={() => {
                        this.toggleMap();
                      }}
                    >
                      Show List View
                    </button>
                    <MapContainer />
                  </>
                ) : (
                  <>
                    <button
                      className="toggleMapButton"
                      onClick={() => {
                        this.toggleMap();
                      }}
                    >
                      Show Map View
                    </button>
                    <PlacesList />
                  </>
                )}
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
