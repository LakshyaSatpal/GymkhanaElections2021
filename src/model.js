const mongoose = require("mongoose");
const validator = require("validator");
const candidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "This candidate is already registered"],
  },
  post: {
    type: String,
    required: [true, "Post is required"],
  },
  intro: {
    type: String,
    required: [true, "Introduction is required"],
    minLength: [30, "Please give a detailed introduction"],
  },
  poster: {
    data: Buffer,
    contentType: String,
  },
  email: {
    type: String,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Email is not correct");
      }
    },
    unique: [true, "Email already registered"],
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    minLength: 10,
    maxLength: 10,
    required: [true, "Phone number is required"],
  },
  fblink: {
    type: String,
    required: [true, "Facebook Profile link is required"],
  },
});

const Candidate = new mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
