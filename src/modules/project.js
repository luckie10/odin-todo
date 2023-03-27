import { stateFunctions } from "../util.js";
import Task from "./task";

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
  return { ...stateFunctions(state), addTask, getTasks, addDefaultTasks };
};

export { Project as default };
