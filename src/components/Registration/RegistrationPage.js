import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";

export default class RegistrationPage extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };
  state = {
    error: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, password, confirmPassword, username, email } = this.state;

    let user = {
      name,
      password,
      username,
      email,
    };

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords must match" });
      return false;
    } else {
      AuthApiService.postUser({
        user,
      })
        .then((user) => {
          this.setState({
            name: "",
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
          });
          const { history } = this.props;
          history.push("/login");
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
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
              onChange={(e) => this.setState({ name: e.target.value })}
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
              onChange={(e) => this.setState({ username: e.target.value })}
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
              onChange={(e) => this.setState({ password: e.target.value })}
            ></input>
            {/* need to add confirm password input */}
            <label
              className="registrationForm_confirmPassword"
              htmlFor="registrationForm_confirmPassword"
            >
              Confirm Password:{" "}
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="signupconfirmPassword"
              placeholder="Confirm Password"
              required
              onChange={(e) =>
                this.setState({ confirmPassword: e.target.value })
              }
            ></input>
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
              onChange={(e) => this.setState({ email: e.target.value })}
            ></input>
            <p className="passwordRequirement">
              Password must be more than 8 characters and contain one upper
              case, lower case, number, and special character. ( ! @ # $ %)
            </p>
            <input type="submit" value="Submit"></input>
          </fieldset>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
        </form>
      </section>
    );
  }
}
