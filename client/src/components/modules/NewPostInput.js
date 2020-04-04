import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} questionId optional prop, used for answers
 * @param {({questionId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
class NewPostInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  // called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div className="u-flex">
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewPostInput-input"
        />
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

/**
 * New Answer is a New Post component for answers
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} questionId to add comment to
 */
class NewAnswer extends Component {
  constructor(props) {
    super(props);
  }

  addAnswer = (value) => {
    const body = { parent: this.props.questionId, content: value };
    post("/api/answer", body).then((answer) => {
      // display this answer on the screen
      this.props.addNewAnswer(answer);
    });
  };

  render() {
    return <NewPostInput defaultText="New Answer" onSubmit={this.addAnswer} />;
  }
}

/**
 * New Question is a New Post component for answers
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewQuestion extends Component {
  addQuestion = (value) => {
    const body = { content: value };
    post("/api/question", body).then((question) => {
      // display this question on the screen
      this.props.addNewQuestion(question);
    });
  };

  render() {
    return <NewPostInput defaultText="New QUestion" onSubmit={this.addQuestion} />;
  }
}

export { NewAnswer, NewQuestion};
