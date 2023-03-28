import { stateFunctions } from "../util.js";

const Task = (name, desc, dueDate, prio, projectName) => {
  const state = { name, desc, dueDate, prio, projectName, complete: false };

  const toggleComplete = () => (state.complete = !state.complete);

  return { ...stateFunctions(state), toggleComplete };
};

export { Task as default };
