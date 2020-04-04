import React, { Component } from "react";

/**
 * Component to render a single answer
 *
 * Proptypes
 * @param {string} _id of answer
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the answer
 */
class SingleAnswer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-answerBody">
        {/* <Link to={`/profile/${this.props.creator_id}`} className="u-link u-bold"> */}
          {this.props.creator_name}
        {/* </Link> */}
        <span>{" | " + this.props.content}</span>
      </div>
    );
  }
}

export default SingleAnswer;
