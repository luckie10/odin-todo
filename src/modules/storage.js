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

  const addProject = (project) => addItem("projects", project);

  const addTask = (task) => addItem("tasks", task);

  const getProjects = () => {
    const projects = handler.getTable("projects");
    if (!projects) return;
    return projects.map(({ name, tasks }) => Project(name, tasks));
  };

  const getTasks = () => {
    const tasks = handler.getTable("tasks");
    if (!tasks) return;
    return tasks.map(({ name, desc, dueDate, prio, projectName, complete }) =>
      Task(name, desc, dueDate, prio, projectName, complete)
    );
  };

  const deleteTask = (taskToDelete) => {
    const tasks = handler.getTable("tasks");
    if (!tasks) return;

    const indexOfTaskToDelete = tasks.findIndex(
      (task) => task.name === taskToDelete.get("name")
    );
    if (indexOfTaskToDelete === -1) return;
    tasks.splice(indexOfTaskToDelete, 1);
    handler.setTable("tasks", tasks);
  };

  return {
    addProject,
    addTask,
    getProjects,
    getTasks,
    deleteTask,
  };
})(handler);

export { Storage as default };
