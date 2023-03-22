import { stateFunctions } from "../util.js";

const Task = (name, desc, dueDate, prio, projectName) => {
  const state = { name, desc, dueDate, prio, projectName };

  return { ...stateFunctions(state) };
};

export { Task as default };
