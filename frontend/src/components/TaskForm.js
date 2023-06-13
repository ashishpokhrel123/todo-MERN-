import React, { useState } from "react";

const TaskForm = ({ onCreateTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateTask(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full py-2 px-4 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter a new task"
        required
      />
      <button
        type="submit"
        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
