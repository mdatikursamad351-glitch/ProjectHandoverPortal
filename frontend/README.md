# Project Handover & Continuity Portal

A web-based portal for managing project information, meeting logs, project handovers, and maintainer takeover requests.

## Project Overview

The Project Handover & Continuity Portal helps teams keep important project information organized and makes it easier for a new maintainer to understand and continue an existing project.

The portal provides project summaries, technology information, repository and Google Drive links, meeting history, and a takeover request workflow.

## Features

### Project Management
- Create projects
- View all projects
- Search projects by name
- Edit project information
- Delete projects
- Track project status:
  - Active
  - On Hold
  - Looking for maintainer
  - Archived
- Set project priority

### Project Information
Each project can contain:
- Project name
- Description
- Tech stack
- GitHub repository link
- Google Drive link
- Current status
- Priority

### Meeting Logs
- Add meeting logs to projects
- Store meeting date
- Store attendees
- Store meeting summary/decisions
- Display meeting history for each project

### Takeover Workflow
- Users can submit takeover requests
- Users can provide a message explaining their interest
- Admin can view pending takeover requests
- Admin can approve requests
- Admin can reject requests
- Approved requests record:
  - Who received access
  - When access was granted

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Development Tools
- Visual Studio Code
- MongoDB Compass
- Git / GitHub

## Project Structure

```text
ProjectHandoverPortal/
│
├── backend/
│   ├── models/
│   │   ├── Project.js
│   │   └── TakeoverRequest.js
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── CreateProject.jsx
│       │   ├── ViewProjects.jsx
│       │   └── TakeoverRequests.jsx
│       └── App.jsx
│
└── README.md