import Project from "./project";
import Storage from "./storage";

const ProjectList = (() => {
  const projects = [];

  const addProject = (newProject) => {
    if (
      projects.find((project) => project.get("name") === newProject.get("name"))
    )
      return "Project already exists";

    projects.push(newProject);
    Storage.updateProjects(projects);
  };

  const getProject = (projectName) =>
    projects.find((project) => project.get("name") === projectName);

  const deleteProject = (projectToDelete) => {
    const index = projects.findIndex((project) => project === projectToDelete);
    if (index !== -1) {
      projects.splice(index, 1);
      Storage.updateProjects(projects);
    }
  };

  const setProjects = (projectsList) => {
    projects.splice(0, projects.length, ...projectsList);
  };

  const getProjects = () => [...projects];

  const addDefaultProjects = () => {
    const defaultProjects = ["Inbox", "Work"];

    defaultProjects.forEach((projectName) => addProject(Project(projectName)));
  };

  return {
    addProject,
    getProject,
    deleteProject,
    getProjects,
    setProjects,
    addDefaultProjects,
  };
})();

export { ProjectList as default };
