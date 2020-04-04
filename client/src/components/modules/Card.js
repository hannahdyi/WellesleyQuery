import React, { Component } from "react";
import SingleQuestion from "./SingleQuestion.js";
import AnswersBlock from "./AnswersBlock.js";
import { get } from "../../utilities";

import "./Card.css";

/**
 * Card is a component for displaying content like questions
 *
 * Proptypes
 * @param {string} _id of the question
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the question
 */
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
    };
  }

  componentDidMount() {
    get("/api/answer", { parent: this.props._id }).then((answers) => {
      this.setState({
        answers: answers,
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewAnswer = (answerObj) => {
    this.setState({
      answers: this.state.answers.concat([answerObj]),
    });
  };

  render() {
    return (
      <div className="Card-container">
        <SingleQuestion
          _id={this.props._id}
          creator_name={this.props.creator_name}
          creator_id={this.props.creator_id}
          content={this.props.content}
        />
        <AnswersBlock
          question={this.props}
          answers={this.state.answers}
          addNewAnswer={this.addNewAnswer}
          userId={this.props.userId}
        />
      </div>
    );
  }
}

export default Card;
