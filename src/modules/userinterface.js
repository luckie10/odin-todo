import { createElement } from "../util";
import ProjectList from "./projectlist";
const UserInterface = (() => {
  let activeProject = ProjectList.getProject("Inbox");

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

  return { loadProject };
})();

export { UserInterface as default };
