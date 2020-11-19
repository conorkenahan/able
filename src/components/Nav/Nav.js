import React from "react";
import Context from "../../Context";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";

export default class Nav extends React.Component {
  static contextType = Context;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  renderLogoutLink() {
    return (
      <div className="loggedIn">
        <Link className="navLink link" to={`/myreviews`}>
          My Reviews
        </Link>
        <Link className="navLink link" onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }
  renderLoginLink() {
    return (
      <div className="auhLink loggedOut">
        <Link className="navLink link" to="/register">
          Register
        </Link>
        <Link className="navLink link" to="/login">
          Log in
        </Link>
      </div>
    );
  }

  render() {
    return (
      <section className="nav">
        <header>
          <h1 className="roamLink">
            <Link className="link" to="/">
              Roam
            </Link>
          </h1>
        </header>
        <div>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </section>
    );
  }
}
