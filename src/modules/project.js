import { stateFunctions } from "../util.js";
import Task from "./task";
import Storage from "./storage";

const Project = (name) => {
  const state = { name };
  const tasks = [];

  const addTask = (task) => {
    tasks.push(task);
    Storage.updateTasks(tasks);
  };

  const deleteTask = (taskToDelete) => {
    tasks.splice(
      tasks.findIndex((task) => task === taskToDelete),
      1
    );
    Storage.updateTasks(tasks);
  };

  const setTasks = (taskList) => {
    tasks = taskList;
  };

  const getTasks = () => tasks;

  const addDefaultTasks = () => {
    const defaultTasks = [
      ["Eat", "Nom Nom Nom", "Now", 0, state.name],
      ["Drink", "Gulp Gulp Gulp", "Today", 1, state.name],
      ["Sleep", "zZzZzZ", "Tonight", 2, state.name],
    ];

    for (const task of defaultTasks) {
      addTask(Task(...task));
    }
  };
  return {
    ...stateFunctions(state),
    addTask,
    deleteTask,
    getTasks,
    addDefaultTasks,
  };
};

export { Project as default };
