import React from "react";
import { task } from "../interfaces";

interface Props {
  task: task;
  //Inorder to call the completeTask function inside of the button we need to pass this as props
  //Add the function as type
  completeTask(_id: string): void;
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
          console.log(task);
          completeTask(task._id);
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoTask;
