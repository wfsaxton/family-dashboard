"use client";

import React from "react";
import { type TodolistAssigneeTasksList } from "./types";
import { XCircle } from "lucide-react";

type TodolistClientProps = {
  todolistAssigneeTaskLists: TodolistAssigneeTasksList[];
};

const TodolistClient = ({
  todolistAssigneeTaskLists: todolistAssigneeTasksLists,
}: TodolistClientProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-2">
      <div className="text-center text-3xl">Today&apos;s Chores</div>
      {todolistAssigneeTasksLists.map((todolistAssigneeTasksList) => {
        return (
          <div
            key={todolistAssigneeTasksList.assigneeName}
            className="flex w-full grow basis-0 flex-col gap-4 rounded-lg border-2 border-white p-2 text-center"
          >
            <div className="text-2xl">
              {todolistAssigneeTasksList.assigneeName}
            </div>

            {todolistAssigneeTasksList.tasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className={`flex w-full rounded-lg p-2 text-lg items-center gap-2 ${todolistAssigneeTasksList.color}`}
                >
                  <XCircle />
                  <span>{task.content}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TodolistClient;
