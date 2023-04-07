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
    const index = tasks.findIndex((task) => task === taskToDelete);
    if (index !== -1) {
      tasks.splice(index, 1);
      Storage.updateTasks(tasks);
    }
  };

  const setTasks = (taskList) => {
    tasks.splice(0, tasks.length, ...taskList);
  };

  const getTasks = () => [...tasks];

  const addDefaultTasks = () => {
    const defaultTasks = [
      ["Eat", "Nom Nom Nom", "Now", 0, state.name],
      ["Drink", "Gulp Gulp Gulp", "Today", 1, state.name],
      ["Sleep", "zZzZzZ", "Tonight", 2, state.name],
    ];

    defaultTasks.forEach((task) => {
      addTask(Task(...task));
    });
  };

  return {
    ...stateFunctions(state),
    addTask,
    deleteTask,
    setTasks,
    getTasks,
    addDefaultTasks,
  };
};

export { Project as default };
