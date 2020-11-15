import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import Context from "../../Context";

export default class LoginPage extends Component {
  static contextType = Context;

  state = { error: null };

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    this.context.setLoadingToTrue();
    this.setState({ error: null });
    const { username, password } = e.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        this.context.setLoadingToFalse();
        const { location, history } = this.props;
        const destination = (location.state || {}).from || "/";
        history.push(destination);
      })
      .catch((res) => {
        this.context.setLoadingToFalse();
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    const { loading = false } = this.context || false;
    return (
      <section className="loginPage">
        <h2>Login</h2>
        <>
          {loading ? (
            <>
              <div className="loader"></div>
            </>
          ) : (
            <>
              <form className="loginForm" onSubmit={this.handleSubmitJwtAuth}>
                <div role="alert">
                  {error && <p className="red">{error}</p>}
                </div>

                <fieldset>
                  <label htmlFor="loginForm__username">Username: </label>
                  <input
                    required
                    name="username"
                    id="loginForm__username"
                  ></input>

                  <label htmlFor="loginForm__password">Password: </label>
                  <input
                    required
                    name="password"
                    type="password"
                    id="loginForm__password"
                  ></input>
                  <input type="submit" value="Submit"></input>
                </fieldset>
              </form>

              <form
                className="testLoginForm"
                onSubmit={this.handleSubmitJwtAuth}
              >
                <input
                  readOnly
                  className="hidden"
                  name="username"
                  value="test"
                ></input>
                <input
                  readOnly
                  className="hidden"
                  name="password"
                  value="Testing123!"
                ></input>
                <input
                  className="testLoginSubmit"
                  type="submit"
                  value="login as demo user here"
                ></input>
              </form>
            </>
          )}
        </>
      </section>
    );
  }
}
