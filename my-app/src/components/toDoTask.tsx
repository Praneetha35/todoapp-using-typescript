import React from "react";
import { task } from "../interfaces";

interface Props {
  task: task;
  //Inorder to call the completeTask function inside of the button we need to pass this as props
  //Add the function as type
  completeTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <div className="task">
      <div className="content">
        <span>{task.taskName}</span>
        <span>{task.deadline}</span>
      </div>
      <button
        onClick={() => {
          completeTask(task.taskName);
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoTask;
