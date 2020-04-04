import React, { Component } from "react";
import SingleAnswer from "./SingleAnswer.js";
import { NewAnswer } from "./NewPostInput.js";

/**
 * @typedef ContentObject
 * @property {string} _id of question/answer
 * @property {string} creator_name
 * @property {string} content of the question/answer
 */

/**
 * Component that holds all the answers for a question
 *
 * Proptypes
 * @param {ContentObject[]} answers
 * @param {ContentObject} question
 */
class AnswersBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-answerSection">
        <div className="question-answers">
          {this.props.answers.map((answer) => (
            <SingleAnswer
              key={`SingleAnswer_${answer._id}`}
              _id={answer._id}
              creator_name={answer.creator_name}
              creator_id={answer.creator_id}
              content={answer.content}
            />
          ))}
          {this.props.userId && (
            <NewAnswer questionId={this.props.question._id} addNewAnswer={this.props.addNewAnswer} />
          )}
        </div>
      </div>
    );
  }
}

export default AnswersBlock;
