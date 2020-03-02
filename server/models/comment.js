const mongoose = require("mongoose");

//define a comment schema for the database
const CommentSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  parent: String, // links to the _id of a parent event (_id is an autogenerated field by Mongoose).
  content: String,
  vote: String,
});

// compile model from schema
module.exports = mongoose.model("comment", CommentSchema);