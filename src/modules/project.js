import { stateFunctions } from "../util.js";

const Project = (name) => {
  const state = { name };
  const tasks = [];

  const addTask = (task) => {
    tasks.push(task);
  };

  const deleteTask = (taskToDelete) => {
    tasks = tasks.filter((task) => task !== taskToDelete);
  };

  const setTasks = (taskList) => {
    tasks = taskList;
  };

  const getTasks = () => tasks;

  return { ...stateFunctions(state) };
};

export { Project as default };
