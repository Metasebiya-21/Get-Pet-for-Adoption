const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");

const adoptionRequestSchema = new mongoose.Schema(
  {
    customer_id: { type: Schema.Types.ObjectId, ref: "user" },
    pet_id: {type: Schema.Types.ObjectId, ref: "pet"},
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
