import { stateFunctions } from "../util.js";
import Task from "./task";
import Storage from "./storage";
import ProjectList from "./projectlist";

const Project = (name) => {
  const state = { name };
  const tasks = [];

  const addTask = (task) => {
    tasks.push(task);
    Storage.addTask(task);
  };

  const deleteTask = (taskToDelete) => {
    const index = tasks.findIndex((task) => task === taskToDelete);
    if (index === -1) return;
    tasks.splice(index, 1);
    Storage.deleteTask(taskToDelete);
  };

  const editTask = (
    taskToEdit,
    newName,
    newDesc,
    newDueDate,
    newPrio,
    newProject
  ) => {
    const taskIndex = tasks.findIndex((task) => task === taskToEdit);
    if (taskIndex === -1) return;

    if (newProject !== state.name) {
      ProjectList.getProject(newProject).addTask(
        Task(
          newName,
          newDesc,
          newDueDate,
          newPrio,
          newProject,
          tasks[taskIndex].get("complete")
        )
      );
      deleteTask(taskToEdit);
    } else {
      tasks[taskIndex] = Task(
        newName,
        newDesc,
        newDueDate,
        newPrio,
        newProject,
        tasks[taskIndex].get("complete")
      );
      Storage.updateTask(taskToEdit, tasks[taskIndex]);
    }
  };

  const toggleCompleteTask = (taskToComplete) => {
    const taskIndex = tasks.findIndex((task) => task === taskToComplete);
    if (taskIndex === -1) return;

    tasks[taskIndex].toggleComplete();
    Storage.updateTask(taskToComplete, tasks[taskIndex]);
  };

  const setTasks = (taskList) => {
    tasks.splice(0, tasks.length, ...taskList);
  };

  const getTasks = () => [...tasks];

  const addDefaultTasks = () => {
    const defaultTasks = [
      ["Eat", "Nom Nom Nom", new Date("2023-05-15T00:00"), 0, state.name],
      ["Drink", "Gulp Gulp Gulp", new Date(2023, 4, 9), 1, state.name],
      ["Sleep", "zZzZzZ", new Date(Date.now()), 2, state.name],
    ];

    defaultTasks.forEach((task) => {
      addTask(Task(...task));
    });
  };

  return {
    ...stateFunctions(state),
    addTask,
    deleteTask,
    editTask,
    toggleCompleteTask,
    setTasks,
    getTasks,
    addDefaultTasks,
  };
};

export { Project as default };
