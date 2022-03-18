const mongoose = require("mongoose");
const crypto = require("crypto");

const adoptionRequestSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      required: true,
      trim: true,
    },
    pet_id: {
      type: String,
      required: true,
      trim: true,
    },
    adoptionGrant: {
      type: Boolean,
      required: true,
      trim: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("adoptionRequest", adoptionRequestSchema);
