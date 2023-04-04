import WebStorageHandler from "./webstorage";
import Task from "./task";

const handler = WebStorageHandler.storageAvailable("localStorage")
  ? WebStorageHandler
  : {}; // TODO: implement non WebStorage option

const Storage = ((handler) => {
  const extractObjectState = (objects) => {
    const state = [];

    for (const obj of objects) {
      state.push(obj.getState());
    }

    return state;
  };

  const updateTasks = (tasks) =>
    handler.updateTable("tasks", extractObjectState(tasks));

  const updateProjects = (projects) =>
    handler.updateTable("projects", extractObjectState(projects));

  const getTasks = () => {
    const tasks = handler.getItem("tasks");
    if (!tasks) return;

    return JSON.parse(tasks).map(
      ({ name, desc, dueDate, prio, projectName, complete }) =>
        Task(name, desc, dueDate, prio, projectName, complete)
    );
  };

  return { updateTasks, updateProjects, getTasks };
})(handler);

export { Storage as default };
