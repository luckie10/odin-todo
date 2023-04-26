import WebStorageHandler from "./webstorage";
import Task from "./task";
import Project from "./project";

const handler = WebStorageHandler.storageAvailable("localStorage")
  ? WebStorageHandler
  : {}; // TODO: implement non WebStorage option

const Storage = ((handler) => {
  const addItem = (type, item) => {
    const items = handler.getTable(type) || [];
    items.push(item.getState());
    handler.setTable(type, items);
  };

  const getItemIndex = (table, itemToUpdate, updatedItem) => {
    const items = handler.getTable(table);
    if (!items) return;

    const index = items.findIndex(
      (item) => item.name === itemToUpdate.get("name")
    );
    if (index === -1) return;

    return { items, index };
  };

  const addProject = (project) => addItem("projects", project);

  const getProjects = () => {
    const projects = handler.getTable("projects");
    if (!projects) return;
    return projects.map(({ name, tasks }) => Project(name, tasks));
  };

  const addTask = (task) => addItem("tasks", task);

  const getTasks = () => {
    const tasks = handler.getTable("tasks");
    if (!tasks) return;
    return tasks.map(({ name, desc, dueDate, prio, projectName, complete }) =>
      Task(name, desc, dueDate, prio, projectName, complete)
    );
  };

  const updateTask = (taskToUpdate, updatedTask) => {
    const { items, index } = getItemIndex("tasks", taskToUpdate);

    items.splice(index, 1, updatedTask.getState());
    handler.setTable("tasks", items);
  };

  const deleteTask = (taskToDelete) => {
    const { items, index } = getItemIndex("tasks", taskToDelete);

    items.splice(index, 1);
    handler.setTable("tasks", items);
  };

  return {
    addProject,
    getProjects,
    addTask,
    getTasks,
    updateTask,
    deleteTask,
  };
})(handler);

export { Storage as default };
