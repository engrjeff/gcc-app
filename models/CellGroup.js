const mongoose = require("mongoose");

const CellGroupSchema = new mongoose.Schema({
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CellMember",
    },
  ],
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  type: {
    type: String,
    enum: ["open", "close"],
    default: "open",
  },
  venue: {
    type: String,
    trim: true,
    required: [true, "Venue is required"],
  },
  day: {
    type: String,
    trim: true,
    required: [true, "Day schedule is required"],
  },
  time: {
    type: String,
    trim: true,
    required: [true, "Time schedule is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CellGroup", CellGroupSchema);
