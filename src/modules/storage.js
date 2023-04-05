import WebStorageHandler from "./webstorage";
import Task from "./task";
import Project from "./project";

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

  const getObjects = (table, object) => {
    const tableItems = handler.getItem(table);
    if (!tableItems) return;

    return JSON.parse(tableItems).map(
      ({ name, desc, dueDate, prio, projectName, complete }) =>
        object(name, desc, dueDate, prio, projectName, complete)
    );
  };

  const updateTasks = (tasks) =>
    handler.updateTable("tasks", extractObjectState(tasks));

  const updateProjects = (projects) =>
    handler.updateTable("projects", extractObjectState(projects));

  const getProjects = () => getObjects("projects", Project);

  const getTasks = () => getObjects("tasks", Task);

  return { updateTasks, updateProjects, getProjects, getTasks };
})(handler);

export { Storage as default };
