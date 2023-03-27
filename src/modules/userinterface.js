import { createElement } from "../util";
import ProjectList from "./projectlist";
import Project from "./project";

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

    taskElement.append(taskComplete, taskName, taskDesc, taskDueDate, taskPrio);
    return taskElement;
  };

  const loadProject = (project) => {
    const tasks = project.getTasks();

    for (const task of tasks) {
      taskListElement.appendChild(generateTask(task));
    }

    activeProject = project;
  };

  const addProject = () => {
    const inputProjectName = document.querySelector(".project-name");
    const name = inputProjectName.value;

    const result = ProjectList.addProject(Project(name));
    if (result) return; // TODO: Add error msg 'Project already exists'
    inputProjectName.value = "";
  };

  const attachEventHandlers = () => {
    const buttonAddProject = document.querySelector(".add-project");
    const buttonAddTask = document.querySelector(".add-task");

    buttonAddProject.addEventListener("click", addProject);
  };

  return { loadProject, attachEventHandlers };
})();

export { UserInterface as default };
