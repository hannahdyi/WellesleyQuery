import React, { Component } from "react";
import "../../utilities.css";
import "./Home.css";

const GOOGLE_CLIENT_ID = "64402399341-j1tphkoe4hbnbka6qh8od3j2k9bd7iq6.apps.googleusercontent.com";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="home-container">
          <div className = "home-image">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 className = "home-maintitle">WELLESLEY QUERY</h1>
            <h6 className = "home-subtitle">Post and browse questions and answers all about Wellesley College</h6>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
