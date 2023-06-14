"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { TodoistApi } from "@doist/todoist-api-typescript";
import { Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { type TodolistTask } from "./types";

type TodolistTaskListProps = {
  assigneeName: string;
  assigneeColor: string;
  tasks: TodolistTask[];
};

const TodolistTaskList = ({
  assigneeName,
  assigneeColor,
  tasks,
}: TodolistTaskListProps) => {
  const [isClosing, setIsClosing] = useState<boolean[]>([]);
  const router = useRouter();
  // Disabling this for isPending because it needs to be there but its unused
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsClosing([]);
    tasks.forEach(() => {
      setIsClosing((isClosing) => [...isClosing, false]);
    });
  }, [tasks]);

  const apiCloseTask = async (id: string) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // return true;

    const api_key = process.env.NEXT_PUBLIC_TODOIST_API_KEY;

    if (!api_key) {
      return <div>Todoist API key not found</div>;
    }

    const api = new TodoistApi(api_key);

    const isTaskClosed = await api.closeTask(id);

    return isTaskClosed;
  };

  const handleCloseTask = async (
    index: number,
    id: string,
    content: string
  ) => {
    setIsClosing(
      isClosing.map((isClosingEntry, isClosingIndex) => {
        const _isClosing = isClosingIndex === index ? true : isClosingEntry;
        return _isClosing;
      })
    );

    const isTaskClosed = await apiCloseTask(id);

    if (isTaskClosed) {
      toast({
        title: "Task closed",
        description: content,
      });

      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
    } else {
      console.log("Task not closed: ", content);
      toast({
        title: "Task not closed",
        description: content,
      });

      setIsClosing(
        isClosing.map((isClosingEntry, isClosingIndex) => {
          const _isClosing = isClosingIndex === index ? false : isClosingEntry;
          return _isClosing;
        })
      );
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <div className="text-center text-2xl ">{assigneeName}</div>

      {tasks.map((task, index) => {
        return (
          <div key={task.id} className="flex w-full">
            {isClosing[index] ? (
              <Button
                className={`w-full justify-start border-2 bg-primary hover:bg-primary}`}
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="ml-2 text-2xl">Closing task...</span>
              </Button>
            ) : (
              <Button
                onClick={() =>
                  void handleCloseTask(index, task.id, task.content)
                }
                className={`w-full justify-start border-2 ${assigneeColor} hover:${assigneeColor}`}
              >
                <XCircle />
                <span className="ml-2 text-2xl">{task.content}</span>
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TodolistTaskList;
