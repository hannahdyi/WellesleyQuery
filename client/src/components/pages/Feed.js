import React, { Component } from "react";
import Card from "../modules/Card.js";
import { NewQuestion } from "../modules/NewPostInput.js";
import { get } from "../../utilities";
import "./Feed.css";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Questions Feed";
    get("/api/questions").then((questionObjs) => {
      let reversedQuestionObjs = questionObjs.reverse();
      reversedQuestionObjs.map((questionObj) => {
        this.setState({ questions: this.state.questions.concat([questionObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewQuestion = (questionObj) => {
    this.setState({
      questions: [questionObj].concat(this.state.questions),
    });
  };

  render() {
    let questionsList = null;
    const hasQuestions = this.state.questions.length !== 0;
    if (hasQuestions) {
      questionsList = this.state.questions.map((questionObj) => (
        <Card
          key={`Card_${questionObj._id}`}
          _id={questionObj._id}
          creator_name={questionObj.creator_name}
          creator_id={questionObj.creator_id}
          content={questionObj.content}
          userId={this.props.userId}
        />
      ));
    } else {
      questionsList = <div>No stories!</div>;
    }
    return (
      <>
        <div className="feed-div">
          <br></br><br></br>
          <h1 className="feed-heading">WELLESLEY COLLEGE</h1>
          <div>
            <div className="feed-subContainer feed-addQuestion" >
            {/* <p className="feed-p">Ask a Question:</p> */}
            {this.props.userId && <NewQuestion addNewQuestion={this.addNewQuestion} />}
            </div> 
            <div className="feed-subContainer feed-questionFeed">
              {questionsList}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Feed;
