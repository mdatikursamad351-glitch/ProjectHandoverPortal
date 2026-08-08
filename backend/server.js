const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Project = require("./models/Project");
const TakeoverRequest = require("./models/TakeoverRequest");

const app = express();
console.log("🚀 SERVER UPDATED - 20:30 TEST");
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


mongoose.connect("mongodb://localhost:27017/atikdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({
    message: "Backend is working!",
    cors: true
  });
});
app.post("/projects", async (req, res) => {
  console.log("PROJECT RECEIVED:", req.body);

  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/projects/:id/access", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (!project.maintainer) {
      return res.status(403).json({
        error: "Access denied. A maintainer must be approved first."
      });
    }

    res.json({
      githubLink: project.githubLink,
      gdriveLink: project.gdriveLink
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete("/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put("/projects/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/projects/:id/meeting", async (req, res) => {
  console.log("Meeting route hit!");
  console.log(req.params.id);
  console.log(req.body);

  try {
    const project = await Project.findById(req.params.id);

project.meetingLogs.push(req.body);

await project.save();

console.log(project);

res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/takeover-requests", async (req, res) => {
  try {
    const request = new TakeoverRequest(req.body);
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/takeover-requests", async (req, res) => {
  try {
    const requests = await TakeoverRequest.find()
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put("/takeover-requests/:id", async (req, res) => {
  try {
    const request = await TakeoverRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ error: "Takeover request not found" });
    }

    request.status = req.body.status;

    if (req.body.status === "Approved") {
  request.accessGrantedTo = request.requesterName;
  request.accessGrantedAt = new Date();

  const project = await Project.findById(request.projectId);

  if (project) {
    project.maintainer = request.requesterName;
    await project.save();
  }
}

    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/hello", (req, res) => {
  console.log("HELLO ROUTE HIT");
  res.json({ message: "Hello POST works" });
});
console.log("GET TAKEOVER ROUTE IS IN THIS FILE");

app.listen(5000, () => {
  console.log("TAKEOVER ROUTE LOADED");
  console.log("Server is running on http://localhost:5000");
});