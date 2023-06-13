import React, { useState } from "react";

const CompletionRate = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState("");

  const handleTaskSelect = (taskId) => {
    setSelectedTask(taskId);
  };

  const uniqueTasks = Array.from(new Set(tasks.map((task) => task.task)));

  const filteredTasks = selectedTask
    ? tasks.filter((task) => task.task === selectedTask)
    : tasks;

  return (
    <div className="mt-4">
      <div>
        <h2 className="text-lg font-bold mb-4">
          Completion Rate of Task Per Days
        </h2>
        <div className="flex space-x-4 mb-4">
          <select
            value={selectedTask}
            onChange={(e) => handleTaskSelect(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4"
          >
            <option value="">All Tasks</option>
            {uniqueTasks.map((task) => (
              <option key={task} value={task}>
                {task}
              </option>
            ))}
          </select>
        </div>
        {filteredTasks.length > 0 ? (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.taskId} className="bg-gray-200 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{task.task}</h3>
                {task.dates.map((date) => (
                  <div key={date.date} className="mb-2">
                    <p className="text-sm font-semibold mb-1">
                      Date: {date.date}
                    </p>
                    <p className="text-lg font-bold">
                      Completion Rate: {date.completionRate}%
                    </p>
                    <hr className="my-2" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div>No tasks found.</div>
        )}
      </div>
    </div>
  );
};

export default CompletionRate;
