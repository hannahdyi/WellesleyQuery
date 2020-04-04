/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Question = require("./models/question");
const Answer = require("./models/answer");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/questions", (req, res) => {
  // empty selector means get all documents
  Question.find({}).then((questions) => res.send(questions));
});

router.post("/question", auth.ensureLoggedIn, (req, res) => {
  const newQuestion = new Question({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });

  newQuestion.save().then((question) => res.send(question));
});

router.get("/answer", (req, res) => {
  Answer.find({ parent: req.query.parent }).then((answer) => {
    res.send(answer);
  });
});

router.post("/answer", auth.ensureLoggedIn, (req, res) => {
  const newAnswer = new Answer({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });

  newAnswer.save().then((answer) => res.send(answer));
});

// router.get("/comment", (req, res) => {
//   Comment.find({ parent: req.query.parent }).then((comments) => {
//     res.send(comments);
//   });
// });

// router.post("/comment", auth.ensureLoggedIn, (req, res) => {
//   const newComment = new Comment({
//     creator_id: req.user._id,
//     creator_name: req.user.name,
//     parent: req.body.parent,
//     content: req.body.content,
//     vote: req.body.vote,
//   });

//   newComment.save().then((comment) => res.send(comment));
// });

// router.get("/commentsnippet", (req, res) => {
//   Comment.find({ parent: req.query.parent }).then((comments) => {
//     var totalLikes = 0;
//     var totalDislikes = 0;
//     var total = 0;
//     for (i=0; i < comments.length; i++) {
//       var comment = comments[i];
//       total++;
//       if (comment.vote === "like"){
//         totalLikes++;
//       } else if ( comment.vote === "dislike") {
//         totalDislikes++;
//       }
//     }
//     res.send({totalLikes, totalDislikes, total})
//   });
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
