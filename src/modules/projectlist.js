const ProjectList = (() => {
  const projects = [];

  const addProject = (project) => {
    projects.push(project);
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
