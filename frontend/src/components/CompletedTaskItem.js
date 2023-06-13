import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

const CompletedTaskList = ({ tasks }) => {
  return (
    <div className="mt-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default CompletedTaskList;
