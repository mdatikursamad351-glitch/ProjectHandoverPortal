const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

export let projects = savedProjects;

export function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}