import { stateFunctions } from "../util.js";

const Task = (name, desc, dueDate, prio, projectName) => {
  const state = { name, desc, dueDate, prio, projectName, complete: false };

  return { ...stateFunctions(state) };
};

export { Task as default };
