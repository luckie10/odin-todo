import WebStorageHandler from "./webstorage";

const handler = WebStorageHandler.storageAvailable("localStorage")
  ? WebStorageHandler
  : {}; // TODO: implement non WebStorage option

const Storage = ((handler) => {
  const updateTasks = (tasks) => {
    const tasksState = [];

    for (const task of tasks) {
      tasksState.push(task.getState());
    }

    handler.updateTable("tasks", tasksState);
  };

  return { updateTasks };
})(handler);

export { Storage as default };
