import UserInterface from "./userinterface";
import ProjectList from "./projectlist";

const EditTaskModal = (() => {
  let taskToEdit;

  const inputEditTaskName = document.querySelector(".edit-task-name");
  const inputEditTaskDesc = document.querySelector(".edit-task-desc");
  const inputEditTaskDueDate = document.querySelector(".edit-task-due-date");
  const inputEditTaskPrio = document.querySelector(".edit-task-priority");
  const inputEditTaskProject = document.querySelector(".edit-task-project");

  const loadEditTaskModal = (task) => {
    taskToEdit = task;
    const { name, desc, dueDate, prio, projectName } = task.getState();
    const editTaskModalNode = document.querySelector(".edit-task-modal");

    inputEditTaskName.value = name;
    inputEditTaskDesc.value = desc;
    inputEditTaskDueDate.value = dueDate;
    inputEditTaskPrio.value = prio;

    UserInterface.loadProjectOptions(
      inputEditTaskProject,
      ProjectList.getProjects(),
      ProjectList.getProject(projectName)
    );

    editTaskModalNode.setAttribute("visibility", "visible");
  };

  return { loadEditTaskModal };
})();

export { EditTaskModal as default };
