const ProjectList = (() => {
  const projects = [];

  const addProject = (newProject) => {
    if (
      projects.find((project) => project.get("name") === newProject.get("name"))
    )
      return "Project already exists";

    projects.push(newProject);
  };

  const deleteProject = (projectToDelete) => {
    projects = projects.filter((project) => project !== projectToDelete);
  };
  const setProjects = (projectsList) => {
    projects = ProjectList;
  };

  const getProjects = () => projects;

  return {};
})();

export { ProjectList as default };
