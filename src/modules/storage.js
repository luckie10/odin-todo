import WebStorageHandler from "./webstorage";

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

  return { updateTasks, updateProjects };
})(handler);

export { Storage as default };
