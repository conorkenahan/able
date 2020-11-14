import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";

export default class RegistrationPage extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };
  state = {
    error: null,
  };

  handleSubmit = (e) => {
    console.log(e.target);

    e.preventDefault();
    const { name, password, username, email } = e.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      name: name.value,
      password: password.value,
      username: username.value,
      email: email.value,
    })
      .then((user) => {
        name.value = "";
        password.value = "";
        username.value = "";
        email.value = "";
        const { history } = this.props;
        history.push("/login");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <section className="registrationPage">
        <form className="registrationForm" onSubmit={this.handleSubmit}>
          <fieldset>
            <h2>Sign Up!</h2>
            <label
              className="registrationForm_name"
              htmlFor="registrationForm_name"
            >
              Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              id="signupName"
              placeholder="name"
              required
            ></input>
            <label
              className="registrationForm_username"
              htmlFor="registrationForm_username"
            >
              Username:{" "}
            </label>
            <input
              type="text"
              name="username"
              id="signupUsername"
              placeholder="username"
              required
            ></input>
            <label
              className="registrationForm_password"
              htmlFor="registrationForm_password"
            >
              Password:{" "}
            </label>
            <input
              type="password"
              name="password"
              id="signupPassword"
              placeholder="password"
              required
            ></input>
            {/* need to add confirm password input */}
            {/* <label
              className="registrationForm_password-repeat"
              htmlFor="registrationForm_password-repeat"
            >
              Confirm Password:{" "}
            </label>
            <input
            type="password-repeat"
            name="password-repeat"
            id="signupPassword-repeat"
            placeholder="password"
            required
          ></input> */}
            <label
              className="registrationForm_email"
              htmlFor="registrationForm_email"
            >
              Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              id="signupEmail"
              placeholder="email"
              required
            ></input>
            <input type="submit" value="Submit"></input>
          </fieldset>
        </form>
      </section>
    );
  }
}
