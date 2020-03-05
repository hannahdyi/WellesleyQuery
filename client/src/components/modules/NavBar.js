import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";
import "../../utilities.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "64402399341-j1tphkoe4hbnbka6qh8od3j2k9bd7iq6.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">
          <Link to={"/"} className="NavBar-link">
              Wellesley Query
          </Link>
        </div>
        <div className="NavBar-linkContainer u-inlineBlock">
          {this.props.userId && (
            <Link to={`/profile/`} className="NavBar-link">
              Your Trips
            </Link>
          )}
          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
