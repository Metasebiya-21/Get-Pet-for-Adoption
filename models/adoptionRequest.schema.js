const mongoose = require("mongoose");
<<<<<<< HEAD
const { Schema } = mongoose;
=======
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
const crypto = require("crypto");

const adoptionRequestSchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    customer_id: { type: Schema.Types.ObjectId, ref: "user" },
    pet_id: {type: Schema.Types.ObjectId, ref: "pet"},
=======
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
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
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
