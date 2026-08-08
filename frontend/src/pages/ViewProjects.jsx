import { useState, useEffect } from "react";

function ViewProjects() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log(err));
  }, []);
  const updateProject = async () => {
  await fetch(
    `http://localhost:5000/projects/${editingProject._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingProject),
    }
  );

  const response = await fetch("http://localhost:5000/projects");
const data = await response.json();

setProjects(data);
setEditingProject(null);
};

  return (
    <div className="container">
      <h1>All Projects</h1>

      <div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
    justifyContent: "center",
    flexWrap: "wrap",
  }}
>
  <div
    style={{
      padding: "18px 25px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      minWidth: "130px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "28px", fontWeight: "bold" }}>
      {projects.length}
    </div>
    <div>Total Projects</div>
  </div>

  <div
    style={{
      padding: "18px 25px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      minWidth: "130px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "28px", fontWeight: "bold" }}>
      {projects.filter((p) => p.status === "Active").length}
    </div>
    <div>Active</div>
  </div>

  <div
    style={{
      padding: "18px 25px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      minWidth: "130px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "28px", fontWeight: "bold" }}>
      {projects.filter((p) => p.status === "On Hold").length}
    </div>
    <div>On Hold</div>
  </div>

  <div
    style={{
      padding: "18px 25px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      minWidth: "130px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "28px", fontWeight: "bold" }}>
      {projects.filter((p) => p.status === "Archived").length}
    </div>
    <div>Archived</div>
  </div>

  <div
    style={{
      padding: "18px 25px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      minWidth: "160px",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: "28px", fontWeight: "bold" }}>
      {
        projects.filter(
          (p) => p.status === "Looking for maintainer"
        ).length
      }
    </div>
    <div>Looking for Maintainer</div>
  </div>
</div>

      <input
        type="text"
        placeholder="Search Project..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
      />

      {projects.length === 0 ? (
        <p>No projects created yet.</p>
      ) : (
        projects
          .filter((project) =>
            (project.projectName || "")
  .toLowerCase()
  .includes(search.toLowerCase())
          )
          .map((project) => (
            <div
              key={project._id}
              style={{
              background: "white",
              padding: "24px",
              margin: "20px 0",
              borderRadius: "12px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb",
            }}
            >
              <h2>{project.projectName || "Unnamed Project"}</h2>

              <p>{project.description}</p>

              <p>
                <strong>Tech:</strong> {project.techStack}
              </p>
              <p>
  <strong>Current Maintainer:</strong>{" "}
  {project.maintainer || "Not assigned"}
</p>

              <p>
                <strong>Status:</strong>

                <span
                  style={{
                   backgroundColor:
                  project.status === "Active"
                  ? "#22c55e"
                  : project.status === "On Hold"
                  ? "#f59e0b"
                  : project.status === "Looking for maintainer"
                  ? "#3b82f6"
                  : "#6b7280",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    marginLeft: "10px",
                  }}
                >
                  {project.status}
                </span>
              </p>

              <p>
  <strong>Priority:</strong>{" "}
  <span
    style={{
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "12px",
      marginLeft: "8px",
      fontSize: "14px",
      fontWeight: "600",
      backgroundColor:
        project.priority === "High"
          ? "#fee2e2"
          : project.priority === "Medium"
          ? "#fef3c7"
          : "#dcfce7",
      color:
        project.priority === "High"
          ? "#b91c1c"
          : project.priority === "Medium"
          ? "#92400e"
          : "#166534",
    }}
  >
    {project.priority}
  </span>
</p>

              {project.maintainer ? (
  <>
    <a
      href={project.githubLink}
      target="_blank"
      rel="noreferrer"
    >
      GitHub Link
    </a>

    <br /><br />

    {project.gdriveLink && (
      <>
        <a
          href={project.gdriveLink}
          target="_blank"
          rel="noreferrer"
        >
          Google Drive Link
        </a>
        <br /><br />
      </>
    )}
  </>
) : (
  <p style={{ color: "#dc2626", fontWeight: "600" }}>
    🔒 GitHub and Google Drive access is locked until a maintainer is approved.
  </p>
)}

<h4>Meeting Logs</h4>

{project.meetingLogs?.length > 0 ? (
  project.meetingLogs.map((log, index) => (
    <div
      key={index}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <p><strong>Date:</strong> {log.date}</p>
      <p><strong>Attendees:</strong> {log.attendees}</p>
      <p><strong>Summary:</strong> {log.summary}</p>
    </div>
  ))
) : (
  <p>No meeting logs yet.</p>
)}

<button
  style={{
    marginRight: "10px",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#dc2626",
    color: "white",
  }}
  onClick={async () => {
    await fetch(`http://localhost:5000/projects/${project._id}`, {
      method: "DELETE",
    });

    setProjects(
      projects.filter((p) => p._id !== project._id)
    );
  }}
>
  Delete Project
</button>

<button
  style={{
    marginRight: "10px",
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#2563eb",
    color: "white",
  }}
  onClick={() => {
    console.log("Edit clicked", project);
    setEditingProject(project);
  }}
>
  Edit Project
</button>
<button
style={{
  marginRight: "10px",
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  background: "#16a34a",
  color: "white",
}}
  onClick={async () => {
    const requesterName = prompt("Enter your name");
    const message = prompt(
      "Why do you want to take over this project? Mention your relevant experience."
    );

    if (!requesterName || !message) return;

    const response = await fetch(
      "http://localhost:5000/takeover-requests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project._id,
          requesterName,
          message,
        }),
      }
    );

    const data = await response.json();

    console.log(data);
    alert("Takeover request submitted successfully!");
  }}
>
  Request to Take Over
</button>
{editingProject?._id === project._id && (
  <div
    style={{
      marginTop: "20px",
      padding: "15px",
      border: "1px solid black",
    }}
  >
    <h3>Edit Project</h3>

    <input
  type="text"
  placeholder="Project Name"
  value={editingProject.projectName}
      onChange={(e) =>
        setEditingProject({
          ...editingProject,
          projectName: e.target.value,
        })
      }
    />

    <br /><br />

    <textarea
  placeholder="Description"
  value={editingProject.description}
      onChange={(e) =>
        setEditingProject({
          ...editingProject,
          description: e.target.value,
        })
      }
    />

    <br /><br />

    <input
  type="text"
  placeholder="Tech Stack"
  value={editingProject.techStack}
      onChange={(e) =>
        setEditingProject({
          ...editingProject,
          techStack: e.target.value,
        })
      }
    />

    <br /><br />

    <input
  type="url"
  placeholder="GitHub Link"
  value={editingProject.githubLink}
      onChange={(e) =>
        setEditingProject({
          ...editingProject,
          githubLink: e.target.value,
        })
      }
    />
    <br /><br />
    <input
  type="url"
  placeholder="Google Drive Link"
  value={editingProject.gdriveLink || ""}
  onChange={(e) =>
    setEditingProject({
      ...editingProject,
      gdriveLink: e.target.value,
    })
  }
/>

<br /><br />
    <select
  value={editingProject.status}
  onChange={(e) =>
    setEditingProject({
      ...editingProject,
      status: e.target.value,
    })
  }
>
  <option>Active</option>
<option>On Hold</option>
<option>Looking for maintainer</option>
<option>Archived</option>
</select>

<br /><br />
<select
  value={editingProject.priority}
  onChange={(e) =>
    setEditingProject({
      ...editingProject,
      priority: e.target.value,
    })
  }
>
  <option>High</option>
  <option>Medium</option>
  <option>Low</option>
</select>

<br /><br />


    <button onClick={updateProject}>
      Save Changes
    </button>

    <button onClick={() => setEditingProject(null)}>
      Cancel
    </button>
  </div>
)}<button
style={{
  marginTop: "10px",
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  background: "#7c3aed",
  color: "white",
}}
  onClick={() => {
    const date = prompt("Enter meeting date (DD/MM/YYYY)");
    const attendees = prompt("Enter attendees");
    const summary = prompt("Enter meeting summary");

    if (!date || !attendees || !summary) return;

    fetch(`http://localhost:5000/projects/${project._id}/meeting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        attendees,
        summary,
      }),
    })
      .then((res) => res.json())
      .then((updatedProject) => {
        setProjects(
          projects.map((p) =>
            p._id === updatedProject._id ? updatedProject : p
          )
        );
      });
  }}
>
  Add Meeting Log
</button>
            </div>
          ))
      )}
      
    </div>
  );
}

export default ViewProjects;