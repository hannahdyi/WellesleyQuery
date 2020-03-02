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
const Trip = require("./models/trip"); // For each trip per user
const Event = require("./models/event"); // For each event per trip
const Comment = require("./models/comment"); // For each comment per event

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

router.get("/inProgressTrips", (req, res) => {
  // Only gets trips associated with that user/creator
  if (req.user){
    Trip.find({
      $or: [
        {creator_id: req.user._id},
        {travellers: req.user._id},
      ],
      isCompleted: false})
      .sort({timestamp: 1})
      .then((trips) => res.send(trips));
  } else {
    res.send({});
  }
});


router.get("/completedTrips", (req, res) => {
  // Only gets trips associated with that user/creator
  if (req.user){
    Trip.find({
      $or: [
        {creator_id: req.user._id},
        {travellers: req.user._id},
      ],
      isCompleted: true})
      .sort({timestamp: 1})
      .then((trips) => res.send(trips));
  } else {
    res.send({});
  }
});

router.post("/trip", auth.ensureLoggedIn, (req, res) => {
  const newTrip = new Trip({
    creator_id: req.user._id,
    creator_name: req.user.name,
    title: req.body.title,
    location: req.body.location, 
    description: req.body.description,
    travellers: req.body.travellers,
    isCompleted: req.body.isCompleted,
  });
  newTrip.save().then((trip) => {
    console.log("Added trip!", trip)
    res.send(trip)});
});

router.post("/joinTrip", auth.ensureLoggedIn, (req, res) => {
  let userId = req.body.userId;
  Trip.findOne({_id:req.body.tripId}).then ((trip) =>{
    if (!trip.travellers.includes(userId) && trip.creator_id !== userId){
      trip.travellers = trip.travellers.concat(userId);
      trip.save().then(() => console.log(
        "Added!"
      ))
    }
    res.send(trip);
  }).catch((err) => res.send({}));
});

router.post("/updatetripstatus", auth.ensureLoggedIn, (req, res) => {
  console.log("in updatetripstatus");
  Trip.findById(req.body.tripId).then ((trip) =>{
    trip.isCompleted = !trip.isCompleted
    trip.save((err, updatedTrip) => {
      res.send(updatedTrip)
    });
  }).catch((err) => res.send({}));
});

router.get("/event", (req, res) => {
// Only gets events associated with particular tripID
  Trip.findById(req.query.tripId).then((trip) => {
    Event.find({parent: req.query.tripId}).then((events) => res.send({events:events, trip:trip}));
  })
});
  
router.get("/singleevent", (req, res) => {
  Event.findOne({_id:req.query._id}).then((event) => res.send(event));
});
  
router.post("/event", auth.ensureLoggedIn, (req, res) => {
  const newEvent = new Event({
    creator_id: req.user._id,
    creator_name: req.user.name,
    name: req.body.name,
    parent: req.body.parent,
    location: req.body.location, 
    description: req.body.description, 
    cost: req.body.cost, 
    details: req.body.details,
  });

  console.log(newEvent);
  console.log("hello");

  newEvent.save().then((event) => res.send(event));
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", auth.ensureLoggedIn, (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
    vote: req.body.vote,
  });

  newComment.save().then((comment) => res.send(comment));
});

router.get("/commentsnippet", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    var totalLikes = 0;
    var totalDislikes = 0;
    var total = 0;
    for (i=0; i < comments.length; i++) {
      var comment = comments[i];
      total++;
      if (comment.vote === "like"){
        totalLikes++;
      } else if ( comment.vote === "dislike") {
        totalDislikes++;
      }
    }
    res.send({totalLikes, totalDislikes, total})
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
