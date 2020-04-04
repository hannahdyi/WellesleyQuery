const mongoose = require("mongoose");

//define a question schema for the database
const QuestionSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
});

// compile model from schema
module.exports = mongoose.model("question", QuestionSchema);
