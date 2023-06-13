import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
