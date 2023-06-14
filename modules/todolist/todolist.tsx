import { todolistConfigs } from "@/config/config";
import { TodoistApi } from "@doist/todoist-api-typescript";
import React from "react";
import TodolistDisplay from "./todolist-display";
import { type TodolistAssigneeTasksList, type TodolistTask } from "./types";

const Todolist = async () => {
  const api_key = process.env.NEXT_PUBLIC_TODOIST_API_KEY;

  if (!api_key) {
    return <div>Todoist API key not found</div>;
  }

  const api = new TodoistApi(api_key);

  const todoistTasks = await api.getTasks({ filter: "#Chores & today" });

  const tasks = todoistTasks.map((task) => {
    return {
      id: task.id,
      assigneeId: task.assigneeId,
      content: task.content,
      description: task.description,
      dueDate: task.due?.date,
    } as TodolistTask;
  });

  const tasksByAssigneeId = new Map<string, TodolistTask[]>();

  for (const todolistConfig of todolistConfigs) {
    tasksByAssigneeId.set(todolistConfig.assigneeId, []);
  }

  for (const task of tasks) {
    const assigneeTasks = tasksByAssigneeId.get(task.assigneeId);

    if (assigneeTasks) {
      assigneeTasks.push(task);
    }
  }

  const todolistAssigneeTasksLists: TodolistAssigneeTasksList[] = [];

  for (const [assigneeId, tasks] of tasksByAssigneeId) {
    todolistAssigneeTasksLists.push({
      assigneeName:
        todolistConfigs.find((config) => config.assigneeId === assigneeId)
          ?.assigneeName || "",
      color:
        todolistConfigs.find((config) => config.assigneeId === assigneeId)
          ?.color || "",
      tasks: tasks,
    } as TodolistAssigneeTasksList);
  }

  return (
    <TodolistDisplay todolistAssigneeTaskLists={todolistAssigneeTasksLists} />
  );
};

export default Todolist;
