const mongoose = require("mongoose");

const CellMemberSchema = new mongoose.Schema({
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is required."],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  birthdate: {
    type: Date,
    required: [true, "Birthdate is required"],
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

module.exports = mongoose.model("CellMember", CellMemberSchema);
