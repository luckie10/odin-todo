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

  return { updateTasks };
  const updateTasks = (tasks) =>
    handler.updateTable("tasks", extractObjectState(tasks));

})(handler);

export { Storage as default };
