import React, { Component } from "react";
import "../../utilities.css";
import "./HonorCode.css";

class HonorCode extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  render() {
    return (
      <>
      <div className="honorcode-container">
        <p>“As a Wellesley College student, I will act with </p>
        <p> honesty, integrity, and respect. In making this </p>
        <p> commitment, I am accountable to the community </p>
        <p> and dedicate myself to a life of honor.”</p>
      </div>
      </>
    );
  }
}

export default HonorCode;
