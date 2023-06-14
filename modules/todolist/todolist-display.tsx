import { type TodolistAssigneeTasksList } from "./types";
import TodolistTaskList from "./todolist-task-list";

type TodolistClientProps = {
  todolistAssigneeTaskLists: TodolistAssigneeTasksList[];
};

const TodolistDisplay = ({
  todolistAssigneeTaskLists: todolistAssigneeTaskLists,
}: TodolistClientProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-2">
      <div className="text-center text-3xl">Today&apos;s Chores</div>
      {todolistAssigneeTaskLists.map((todolistAssigneeTasksList) => {
        return (
          <div
            key={todolistAssigneeTasksList.assigneeName}
            className="flex w-full grow basis-0 gap-2 rounded-lg border-2 border-white"
          >
            <TodolistTaskList
              assigneeName={todolistAssigneeTasksList.assigneeName}
              assigneeColor={todolistAssigneeTasksList.color}
              tasks={todolistAssigneeTasksList.tasks}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TodolistDisplay;
