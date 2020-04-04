import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import NavBar from "./modules/NavBar";
import Feed from "./pages/Feed.js";
import HonorCode from "./pages/HonorCode.js";
import "../utilities.css";
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    }).then(() => {navigate(`/feed/`)});
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout")
    .then(() => {navigate(`/`)});
  };

  render() {
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <Router>
          <Home path="/" userId={this.state.userId} />
          <Feed path="/feed/" userId={this.state.userId} />
          <HonorCode path="/honorcode/" userId={this.state.userId} />
          {/* <Profile path="/profile/" userId={this.state.userId}/>
          <TripFeed path="/tripFeed/:tripId" userId={this.state.userId}/>
          <EventDetails path="/eventDetails/:eventId" userId={this.state.userId} /> */}
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
