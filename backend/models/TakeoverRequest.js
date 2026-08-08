const mongoose = require("mongoose");

const takeoverRequestSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  requesterName: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },

  accessGrantedTo: {
    type: String,
  },

  accessGrantedAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TakeoverRequest", takeoverRequestSchema);