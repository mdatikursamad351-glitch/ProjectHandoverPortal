const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: String,
  description: String,
  techStack: String,
  githubLink: String,
  gdriveLink: String,
  status: String,
  priority: String,
  maintainer: {
    type: String,
    default: null,
  },

  meetingLogs: [
    {
      date: String,
      attendees: String,
      summary: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);