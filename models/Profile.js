const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  birthdate: {
    type: Date,
    required: [true, "Birthdate is required"],
  },
  cellLeader: {
    type: String,
  },
  type: {
    type: String,
    enum: ["parent", "young professional", "student"],
    default: "student",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Gender is required"],
  },
  cellStatus: {
    type: String,
    enum: ["1T", "2T", "3T", "4T", "R"],
    default: "1T",
  },
  churchStatus: {
    type: String,
    enum: ["NACS", "ACS", "CICS"],
    default: "NACS",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
