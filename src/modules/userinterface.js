import { createElement, removeAllChildren } from "../util";
import ProjectList from "./projectlist";
import Project from "./project";
import Task from "./task";
import Storage from "./storage";
import EditTaskModal from "./edit_task_modal";
import { format } from "date-fns";

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
    const { name, desc, dueDate, prio, complete } = task.getState();
    const taskElementWrapper = createElement("li", { class: "task-wrapper" });
    const taskElement = createElement("div", { class: "task" });
    const taskName = createElement("h3", {
      class: `task-name prio${prio}`,
      textContent: name,
    });
    const taskDesc = createElement("div", {
      class: "task-desc",
      textContent: desc,
    });
    const taskDueDate = createElement("div", {
      class: "task-due-date",
      textContent: format(dueDate, "LLL dd yyyy"),
    });
    if (dueDate < Date.now()) taskDueDate.classList.add("overdue");
    const taskComplete = createElement("input", {
      type: "checkbox",
      class: "task-complete",
    });
    taskComplete.checked = complete;
    if (complete) taskElement.classList.add("completed");
    const buttonDeleteTask = createElement("button", {
      class: "button-delete-task",
      textContent: "Delete",
    });

    taskComplete.addEventListener("click", () => {
      activeProject.toggleCompleteTask(task);
      taskElement.classList.toggle("completed");
    });
    taskElement.addEventListener("click", () =>
      EditTaskModal.loadEditTaskModal(task)
    );
    buttonDeleteTask.addEventListener("click", () => {
      activeProject.deleteTask(task);

      loadProject(activeProject);
    });

    taskElement.append(taskName, taskDesc, taskDueDate);
    taskElementWrapper.append(taskComplete, taskElement, buttonDeleteTask);

    return taskElementWrapper;
  };

  const generateProject = (project) => {
    const projectElement = createElement("li", { class: "project-list-item" });
    const projectName = createElement("div", {
      class: "project-name",
      textContent: project.get("name"),
    });
    const buttonProjectDelete = createElement("button", {
      class: "project-delete",
      textContent: "Delete",
    });

    projectName.addEventListener("click", () => loadProject(project));
    buttonProjectDelete.addEventListener("click", () => {
      ProjectList.deleteProject(project);
      loadProjectList(ProjectList.getProjects());
    });

    projectElement.append(projectName, buttonProjectDelete);
    return projectElement;
  };

  const changeSelectedOption = () => {
    const opts = Array.from(inputTaskProject.options);
    opts.map((opt) => {
      if (opt.text === activeProject.get("name")) opt.selected = true;
      else opt.selected = false;
    });
  };

  const generateSelectOption = (value, text, selected = false) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.text = text;
    opt.selected = selected;

    return opt;
  };

  const loadProjectOptions = (selectNode, projects, selectedProject) => {
    removeAllChildren(selectNode);

    for (const project of projects) {
      const projectName = project.get("name");
      selectNode.add(
        generateSelectOption(
          projectName,
          projectName,
          project === selectedProject
        )
      );
    }
  };

  const loadProject = (project) => {
    const projectName = document.querySelector(".project-title");
    const name = project.get("name");
    projectName.innerText = name;

    removeAllChildren(taskListElement);

    const tasks = project.getTasks();

    for (const task of tasks) {
      taskListElement.appendChild(generateTask(task));
    }

    activeProject = project;
    changeSelectedOption();
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

    const result = ProjectList.addProject(Project(name));
    if (result) return; // TODO: Add error msg 'Project already exists'

    const projects = ProjectList.getProjects();
    loadProjectList(projects);
    loadProjectOptions(inputTaskProject, projects, activeProject);
    inputProjectName.value = "";
  };

  // TODO: Prevent the addition of blank tasks
  const addTask = () => {
    const name = inputTaskName.value;
    const desc = inputTaskDesc.value;
    const dueDate = new Date(inputTaskDueDate.value + "T00:00"); // Added the "T00:00" to prevent Date constructor from converting to UTC zone
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
    loadProjectOptions(inputTaskProject, projects, activeProject);
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
