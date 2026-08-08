Project Handover & Continuity Portal

A web-based portal for managing project information, meeting logs, project handovers, maintainer assignments, and takeover requests.

Project Overview

The Project Handover & Continuity Portal is designed to preserve important project knowledge and make project transitions easier.

The portal allows users to create and manage project information, maintain meeting history, request to take over projects, and approve a new maintainer through an administrator workflow.

Repository and Google Drive access is gated until a maintainer has been approved, helping ensure that project resources are only exposed after the takeover process is completed.

Features

Project Management

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
- Display the current maintainer

Project Information

Each project can contain:

- Project name
- Description
- Technology stack
- GitHub repository link
- Google Drive link
- Project status
- Priority
- Current maintainer
- Meeting logs

Meeting Logs

- Add meeting logs to projects
- Record meeting date
- Record attendees
- Record meeting summary/decisions
- Display meeting history for each project

Takeover Workflow

1. A user selects a project.
2. The user submits a takeover request.
3. The requester provides their name and relevant experience/reason.
4. The request is stored in MongoDB with a "Pending" status.
5. The administrator can view the request.
6. The administrator can approve or reject the request.
7. When approved, the requester becomes the project's maintainer.
8. The approval time and person receiving access are recorded.

Access Gating

Project repository and documentation links are protected by the maintainer approval workflow.

- Before a maintainer is approved:
  - GitHub access is locked.
  - Google Drive access is locked.
- After a takeover request is approved:
  - The approved requester becomes the project maintainer.
  - GitHub and Google Drive links become available.
  - Access-grant information is recorded.

The backend also provides a dedicated project-access endpoint that checks whether a maintainer has been assigned before returning project repository/documentation links.

Takeover Notifications

The administrator takeover page provides notification feedback for pending takeover requests.

- Displays the number of pending requests.
- Automatically checks for new requests every 5 seconds.
- Updates the pending-request notification without requiring a manual page refresh.
- Allows the administrator to approve or reject requests.

Tech Stack

Frontend

- React
- Vite
- JavaScript
- CSS

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

Development Tools

- Visual Studio Code
- MongoDB / MongoDB Compass
- Git
- GitHub

Project Structure

ProjectHandoverPortal/
│
├── backend/
│   ├── models/
│   │   ├── Project.js
│   │   └── TakeoverRequest.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── CreateProject.jsx
│   │   │   ├── ViewProjects.jsx
│   │   │   └── TakeoverRequests.jsx
│   │   └── App.jsx
│   ├── package.json
│   └── ...
│
└── README.md

Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB
- Visual Studio Code (recommended)

MongoDB must be running locally because the backend connects to:

mongodb://localhost:27017/atikdb

Installation

1. Clone or download the project

Open the project folder in Visual Studio Code.

2. Install backend dependencies

Open a terminal in the "backend" directory:

cd backend
npm install

3. Install frontend dependencies

Open another terminal and run:

cd frontend
npm install

Running the Application

The frontend and backend should be run separately.

Start the Backend

From the "backend" directory:

node server.js

The backend runs on:

http://localhost:5000

A successful startup should show messages indicating that MongoDB is connected and the server is running.

Start the Frontend

From the "frontend" directory:

npm run dev

Vite will provide the local frontend address, normally:

http://localhost:5173

Open the displayed Vite URL in a browser.

Database

The application uses MongoDB with the database:

atikdb

The main collections/models are:

- "Project"
- "TakeoverRequest"

Project Data

Projects store information such as:

- Project name
- Description
- Tech stack
- GitHub link
- Google Drive link
- Status
- Priority
- Maintainer
- Meeting logs
- Creation timestamp

Takeover Request Data

Takeover requests store information such as:

- Project ID
- Requester name
- Request message
- Request status
- Access granted to
- Access granted timestamp
- Creation timestamp

Main API Endpoints

Projects

Method| Endpoint| Purpose
GET| "/projects"| Retrieve all projects
POST| "/projects"| Create a project
PUT| "/projects/:id"| Update a project
DELETE| "/projects/:id"| Delete a project
POST| "/projects/:id/meeting"| Add a meeting log
GET| "/projects/:id/access"| Check maintainer approval and return protected links

Takeover Requests

Method| Endpoint| Purpose
GET| "/takeover-requests"| Retrieve takeover requests
POST| "/takeover-requests"| Submit a takeover request
PUT| "/takeover-requests/:id"| Approve or reject a request

Access Control Workflow

The project access workflow follows this sequence:

Project Created
      │
      ▼
No Maintainer
      │
      ▼
GitHub / Google Drive Locked
      │
      ▼
User Requests Takeover
      │
      ▼
Admin Receives Notification
      │
      ▼
Admin Reviews Request
      │
   ┌──┴──┐
   ▼     ▼
Reject  Approve
   │     │
   │     ▼
   │   Maintainer Assigned
   │     │
   │     ▼
   │   Project Access Enabled
   │
   ▼
Request Rejected

Testing

The following workflow can be used to verify the application.

Test 1 — Project Creation

1. Open the Create Project page.
2. Enter project information.
3. Add GitHub and Google Drive links.
4. Create the project.
5. Verify that the project appears in View Projects.

Test 2 — Project Search

1. Open View Projects.
2. Enter a project name in the search box.
3. Verify that matching projects are displayed.

Test 3 — Access Gating

1. Create or use a project without an approved maintainer.
2. Open View Projects.
3. Verify that the project displays:
   - "Current Maintainer: Not assigned"
   - A locked-access message for GitHub and Google Drive.
4. Submit a takeover request.
5. Approve the request through the Takeover Requests page.
6. Verify that the maintainer name is displayed.
7. Verify that the GitHub and Google Drive links become available.

Test 4 — Takeover Notification

1. Open the Takeover Requests page.
2. Submit a new takeover request from the project page.
3. Verify that the pending-request notification appears.
4. Verify that the pending count updates automatically.
5. Approve or reject the request.
6. Verify that the request status changes correctly.

Test 5 — Meeting Logs

1. Open a project.
2. Add a meeting log.
3. Enter date, attendees, and summary.
4. Verify that the meeting log appears under the project.

Test 6 — Project Editing and Deletion

1. Edit an existing project.
2. Save the changes.
3. Verify that the updated information appears.
4. Delete a test project.
5. Verify that it is removed from the project list.

Screenshots / Demo

For final submission, add screenshots demonstrating the main functionality.

Recommended screenshots:

1. Create Project page
2. Project list/dashboard
3. Project with locked GitHub/Google Drive access
4. Takeover request submission
5. Admin takeover notification
6. Pending takeover request
7. Approved takeover request
8. Project showing assigned maintainer
9. Unlocked GitHub/Google Drive access
10. Meeting logs

Screenshots can be added to this README using:

![Description](path/to/screenshot.png)

For a live demonstration, start both the backend and frontend and follow the workflow described in the Testing section.

Assumptions

- The application is intended for a local development/demo environment.
- MongoDB is available locally.
- The backend uses the local MongoDB database "atikdb".
- The frontend runs on the Vite development server.
- The current application uses a simple administrator workflow rather than a full authentication/authorization system.
- Maintainer approval is represented by the "maintainer" field in the project document.
- Repository and Google Drive links are considered protected project resources.
- The notification mechanism uses periodic polling to detect new takeover requests.

Limitations

- User authentication and role-based login are not currently implemented.
- The administrator interface is accessible through the application without a production authentication system.
- Notification updates currently use periodic polling rather than WebSockets or push notifications.
- The application is currently configured for local development.
- Production deployment configuration is outside the current scope.

Future Improvements

Possible future enhancements include:

- User authentication and authorization
- Dedicated owner/admin roles
- Email notifications
- Real-time WebSocket notifications
- Audit logs
- Role-based project permissions
- Cloud deployment
- Secure environment variables for database configuration
- Automated testing
- Production-grade access control
- File/document preview and management

Conclusion

The Project Handover & Continuity Portal provides a centralized workflow for maintaining project knowledge and enabling controlled project transitions.

It combines project management, meeting history, takeover requests, maintainer assignment, access gating, and administrator notifications into a single web application.