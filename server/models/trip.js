const mongoose = require("mongoose");

//define a story schema for the database
const TripSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  title: String,
  location: String, 
  description: String, 
  travellers: [String],
  isCompleted: Boolean,
  timestamp: {type: Date, default: Date.now},
});


// compile model from schema
module.exports = mongoose.model("trip", TripSchema);