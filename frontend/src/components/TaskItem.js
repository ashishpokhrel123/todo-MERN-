import React from "react";
import axios from "axios";

const TaskItem = ({ task }) => {
  const handleStatusUpdate = async (taskId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${taskId}/completed`
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="flex items-center justify-between py-2 px-4 bg-white shadow-sm rounded-md mb-2">
      <div>{task.task}</div>

      <div>
        {task.completed ? (
          <span className="text-green-500">Completed</span>
        ) : (
          <button
            onClick={() => handleStatusUpdate(task._id)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
