const mongoose = require("mongoose");
const crypto = require("crypto");

const petSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    breed: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    good_with_Children: {
      type: Boolean,
      required: true,
      trim: true,
    },
    profile: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },

    photos: {
      type: Array,
      // required: true,
    },
    adopted: {
      type: Boolean,
      required: true,
      trim: true,
      default: false,
    },
    adoptedBy: {
      type: String,
    },
    adoptedOn: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pet", petSchema);
