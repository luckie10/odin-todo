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
    projects.splice(
      projects.findIndex((project) => project === projectToDelete)
    );
    Storage.updateProjects(projects);
  };

  const setProjects = (projectsList) => {
    projects = ProjectList;
  };

  const getProjects = () => projects;

  const addDefaultProjects = () => {
    const defaultProjects = ["Inbox"];

    for (const projectName of defaultProjects) {
      addProject(Project(projectName));
    }
  };

  return { addProject, getProject, getProjects, addDefaultProjects };
})();

export { ProjectList as default };
