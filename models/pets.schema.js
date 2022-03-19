const mongoose = require("mongoose");
<<<<<<< HEAD
const { Schema } = mongoose
=======
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
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
<<<<<<< HEAD
    adoptedBy: { type: Schema.Types.ObjectId, ref: "user" },
=======
    adoptedBy: {
      type: String,
    },
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
    adoptedOn: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pet", petSchema);
