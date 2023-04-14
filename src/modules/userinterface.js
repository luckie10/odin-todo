import { createElement, removeAllChildren } from "../util";
import ProjectList from "./projectlist";
import Project from "./project";
import Task from "./task";
import Storage from "./storage";

const UserInterface = (() => {
  let activeProject;

  const projectListElement = document.querySelector(".project-list");
  const taskListElement = document.querySelector(".task-list");

  const inputTaskName = document.querySelector(".task-name");
  const inputTaskDesc = document.querySelector(".desc");
  const inputTaskDueDate = document.querySelector(".due-date");
  const inputTaskPriority = document.querySelector(".priority");
  const inputTaskProject = document.querySelector(".add-task-project");

  const generateTask = (task) => {
    const taskState = task.getState();
    const { name, desc, dueDate, prio, complete } = taskState;
    const taskElement = createElement("li", { class: "task" });
    const taskName = createElement("div", {
      class: "task-name",
      textContent: name,
    });
    const taskDesc = createElement("div", {
      class: "task-desc",
      textContent: desc,
    });
    const taskDueDate = createElement("div", {
      class: "task-due-date",
      textContent: dueDate,
    });
    const taskPrio = createElement("div", {
      class: "task-prio",
      textContent: prio,
    });
    const taskComplete = createElement("input", {
      type: "checkbox",
      class: "task-complete",
      textContent: complete,
    });
    const buttonDeleteTask = createElement("button", {
      class: "button-delete-task",
      textContent: "Delete",
    });

    taskComplete.addEventListener("click", task.toggleComplete);
    buttonDeleteTask.addEventListener("click", () => {
      activeProject.deleteTask(task);

      loadProject(activeProject);
    });

    taskElement.append(
      taskComplete,
      taskName,
      taskDesc,
      taskDueDate,
      taskPrio,
      buttonDeleteTask
    );

    return taskElement;
  };

  const generateProject = (project) => {
    const projectElement = createElement("li", { class: "project-list-item" });
    const projectName = createElement("div", {
      class: "project-name",
      textContent: project.get("name"),
    });

    projectElement.append(projectName);
    projectElement.addEventListener("click", () => loadProject(project));
    return projectElement;
  };

  const generateSelectOption = (value, text, selected = false) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.text = text;
    opt.selected = selected;

    return opt;
  };

  const loadProjectOptions = (projects) => {
    removeAllChildren(inputTaskProject);

    for (const project of projects) {
      const projectName = project.get("name");
      inputTaskProject.add(
        generateSelectOption(
          projectName,
          projectName,
          project === activeProject
        )
      );
    }
  };

  const loadProject = (project) => {
    removeAllChildren(taskListElement);

    const tasks = project.getTasks();

    for (const task of tasks) {
      taskListElement.appendChild(generateTask(task));
    }

    activeProject = project;
  };

  const loadProjectList = (projectList) => {
    removeAllChildren(projectListElement);

    projectList.forEach((project) => {
      projectListElement.appendChild(generateProject(project));
    });
  };

  const addProject = () => {
    const inputProjectName = document.querySelector(".project-name");
    const name = inputProjectName.value;
    const projects = ProjectList.getProjects();

    const result = ProjectList.addProject(Project(name));
    if (result) return; // TODO: Add error msg 'Project already exists'

    loadProjectList(projects);
    loadProjectOptions(projects);
    inputProjectName.value = "";
  };

  const addTask = () => {
    const name = inputTaskName.value;
    const desc = inputTaskDesc.value;
    const dueDate = inputTaskDueDate.value;
    const prio = inputTaskPriority.value;
    const projectName = inputTaskProject.value;

    const project = ProjectList.getProject(projectName);

    project.addTask(Task(name, desc, dueDate, prio, projectName));

    inputTaskName.value = "";
    inputTaskDesc.value = "";
    inputTaskDueDate.value = "";
    inputTaskPriority.value = "";

    if (activeProject === project) loadProject(activeProject);
  };

  const attachEventHandlers = () => {
    const buttonAddProject = document.querySelector(".add-project");
    const buttonAddTask = document.querySelector(".add-task-button");

    buttonAddProject.addEventListener("click", addProject);
    buttonAddTask.addEventListener("click", addTask);
  };

  const initProjects = () => {
    if (!Storage.getProjects()) ProjectList.addDefaultProjects();
    const projects = Storage.getProjects();
    ProjectList.setProjects(projects);
    activeProject = ProjectList.getProject("Inbox");

    return projects;
  };

  const initTasks = (projects) => {
    if (!Storage.getTasks()) ProjectList.getProject("Work").addDefaultTasks();
    const tasks = Storage.getTasks();
    for (const project of projects) {
      const filteredTasks = tasks.filter(
        (task) => task.get("projectName") === project.get("name")
      );
      project.setTasks(filteredTasks);
    }
  };

  const init = () => {
    const projects = initProjects();
    initTasks(projects);
    loadProjectList(projects);
    loadProjectOptions(projects);
    loadProject(activeProject);
    attachEventHandlers();
  };

  return {
    loadProject,
    loadProjectList,
    loadProjectOptions,
    attachEventHandlers,
    init,
  };
})();

export { UserInterface as default };
