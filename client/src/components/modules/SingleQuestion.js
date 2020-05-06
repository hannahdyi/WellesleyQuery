import React, { Component } from "react";

/**
 * Question is a component that renders creator and content of a question
 *
 * Proptypes
 * @param {string} _id of the question
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the question
 */
class SingleQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-question">
        {/* <Link to={`/profile/${this.props.creator_id}`} className="u-link u-bold"> */}
          {/* {this.props.creator_name} */}
        {/* </Link> */}
        <p className="Card-questionContent">{this.props.content}</p>
      </div>
    );
  }
}

export default SingleQuestion;
