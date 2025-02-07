const mongoose = require("mongoose");

const ReasonSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    payementStatus: {
      type: String,
      required: true,
    },
    refundStatus:{
      type: String,
      default: "Pending",
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reason", ReasonSchema);
