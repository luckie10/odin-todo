import { createElement, removeAllChildren } from "../util";
import ProjectList from "./projectlist";
import Project from "./project";
import Task from "./task";

const UserInterface = (() => {
  let activeProject = ProjectList.getProject("Inbox");

  const projectListElement = document.querySelector(".project-list");
  const taskListElement = document.querySelector(".task-list");

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
    const projectElement = createElement("li", { class: "project" });
    const projectName = createElement("div", {
      class: "project-name",
      textContent: project.get("name"),
    });

    projectElement.append(projectName);
    return projectElement;
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

    for (const project of projectList) {
      projectListElement.appendChild(generateProject(project));
    }
  };

  const addProject = () => {
    const inputProjectName = document.querySelector(".project-name");
    const name = inputProjectName.value;

    const result = ProjectList.addProject(Project(name));
    if (result) return; // TODO: Add error msg 'Project already exists'
    inputProjectName.value = "";
  };

  const addTask = () => {
    const inputName = document.querySelector(".task-name");
    const inputDesc = document.querySelector(".desc");
    const inputDueDate = document.querySelector(".due-date");
    const inputPriority = document.querySelector(".priority");

    const name = inputName.value;
    const desc = inputDesc.value;
    const dueDate = inputDueDate.value;
    const prio = inputPriority.value;

    activeProject.addTask(
      Task(name, desc, dueDate, prio, activeProject.get("name"))
    );

    inputName.value = "";
    inputDesc.value = "";
    inputDueDate.value = "";
    inputPriority.value = "";

    loadProject(activeProject);
  };

  const attachEventHandlers = () => {
    const buttonAddProject = document.querySelector(".add-project");
    const buttonAddTask = document.querySelector(".add-task");

    buttonAddProject.addEventListener("click", addProject);
    buttonAddTask.addEventListener("click", addTask);
  };

  return { loadProject, loadProjectList, attachEventHandlers };
})();

export { UserInterface as default };
