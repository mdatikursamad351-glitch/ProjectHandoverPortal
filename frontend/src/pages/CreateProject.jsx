
import { useState } from "react";

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [gdriveLink, setGdriveLink] = useState("");
  const [status, setStatus] = useState("Active");
  const [priority, setPriority] = useState("Medium");

const handleSubmit = async (e) => {
  e.preventDefault();
console.log("Create button clicked");
  const project = {
    projectName,
    description,
    techStack,
    githubLink,
    gdriveLink,
    status,
    priority,
  };

  try {
    const response = await fetch("https://projecthandoverportal-production.up.railway.app/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    const data = await response.json();
    console.log("SENT PROJECT:", project);
    console.log("GDRIVE LINK:", project.gdriveLink);

    console.log(data);

    alert("Project Created Successfully!");

    setProjectName("");
    setDescription("");
    setTechStack("");
    setGithubLink("");
    setGdriveLink("");
    setStatus("Active");
    setPriority("Medium");

  } catch (error) {
    console.log(error);
    alert("Error creating project");
  }
};

  return (
    <div className="container">
      <h1>Create Project</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Tech Stack"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="GitHub Link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <br /><br />
        <input
          type="text"
          placeholder="Google Drive Link"
          value={gdriveLink}
          onChange={(e) => setGdriveLink(e.target.value)}
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Active</option>
          <option>On Hold</option>
          <option>Looking for maintainer</option>
          <option>Archived</option>
        </select>
        <br /><br />

<select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
>
  <option>High</option>
  <option>Medium</option>
  <option>Low</option>
</select>

        <br /><br />

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;