const mongoose = require("mongoose");
const { Schema } = mongoose;

// const requiredNumber = {
//   type: Number,
//   required: true,
// };

const logEntrySchema = new Schema({
  title: {
    type: String,
    //   required: true,
  },
  description: String,
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    type: Number,
    min: -90,
    max: 90,
  },

  longitude: {
    type: Number,
    min: -180,
    max: 180,
  },
  visitDate: {
    type: Date,
  },
});
const LogEntry = mongoose.model("LogEntry", logEntrySchema);

module.exports = LogEntry;
