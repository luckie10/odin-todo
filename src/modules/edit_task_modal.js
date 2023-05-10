import UserInterface from "./userinterface";
import ProjectList from "./projectlist";
import Project from "./project";
import project from "./project";

const EditTaskModal = (() => {
  let taskToEdit;

  const editTaskModalNodeWrapper = document.querySelector(
    ".edit-task-modal-wrapper"
  );
  const editTaskModalNode = document.querySelector(".edit-task-modal");
  const inputEditTaskName = document.querySelector(".edit-task-name");
  const inputEditTaskDesc = document.querySelector(".edit-task-desc");
  const inputEditTaskDueDate = document.querySelector(".edit-task-due-date");
  const inputEditTaskPrio = document.querySelector(".edit-task-priority");
  const inputEditTaskProject = document.querySelector(".edit-task-project");
  const buttonEditTaskSave = document.querySelector(".edit-save-task-button");

  const loadEditTaskModal = (task) => {
    taskToEdit = task;
    const { name, desc, dueDate, prio, projectName } = task.getState();

    inputEditTaskName.value = name;
    inputEditTaskDesc.value = desc;
    inputEditTaskDueDate.value = dueDate;
    inputEditTaskPrio.value = prio;

    UserInterface.loadProjectOptions(
      inputEditTaskProject,
      ProjectList.getProjects(),
      ProjectList.getProject(projectName)
    );

    editTaskModalNodeWrapper.classList.remove("hide");
    editTaskModalNodeWrapper.addEventListener("click", (e) => {
      if (e.target === editTaskModalNodeWrapper)
        editTaskModalNodeWrapper.classList.add("hide");
    });
  };

  const saveTaskEdit = () => {
    const name = inputEditTaskName.value;
    const desc = inputEditTaskDesc.value;
    const dueDate = inputEditTaskDueDate.value;
    const prio = inputEditTaskPrio.value;
    const projectName = inputEditTaskProject.value;

    const project = ProjectList.getProject(taskToEdit.get("projectName"));

    project.editTask(taskToEdit, name, desc, dueDate, prio, projectName);
    UserInterface.loadProject(project);
    editTaskModalNode.classList.toggle("hide");
  };

  buttonEditTaskSave.addEventListener("click", saveTaskEdit);

  return { loadEditTaskModal, saveTaskEdit };
})();

export { EditTaskModal as default };
