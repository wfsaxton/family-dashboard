type TodolistTask = {
  id: string;
  assigneeId: string;
  content: string;
  description: string;
  dueDate: string;
};

type TodolistConfig = {
  assigneeId: string;
  assigneeName: string;
  color: string;
};

type TodolistAssigneeTaskList = {
  assigneeName: string;
  color: string;
  tasks: TodolistTask[];
}

export { type TodolistTask, type TodolistConfig, type TodolistAssigneeTaskList as TodolistAssigneeTasksList};
