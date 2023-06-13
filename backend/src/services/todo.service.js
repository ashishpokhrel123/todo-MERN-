const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const TaskModel = require("../models/task.model");

const createTodo = async (data) => {
  console.log(data);
  try {
    const newTask = await TaskModel.create(data);
    return newTask;
  } catch (error) {
    console.log(error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create a new task"
    );
  }
};

const getAllTodo = async () => {
  const tasks = await TaskModel.find();
  if (tasks.length > 0) {
    return tasks;
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "No tasks found");
  }
};

const getTaskById = async (id) => {
  const task = await TaskModel.findOne({ _id: id });
  if (task) {
    return task;
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
};

const getCompletedTask = async () => {
  const completedTasks = await TaskModel.find({ completed: true });
  console.log(completedTasks);
  return completedTasks;
};

const getTaskCompletionRate = async () => {
  try {
    const completionRates = await TaskModel.aggregate([
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            taskId: "$_id",
            task: "$task",
          },
          completed: { $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] } },
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          taskId: "$_id.taskId",
          task: "$_id.task",
          completionRate: {
            $cond: [
              { $eq: ["$total", 0] },
              0,
              { $multiply: [{ $divide: ["$completed", "$total"] }, 100] },
            ],
          },
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);

    const completionRatesWithDetails = completionRates.map((rate) => ({
      task: rate.task,
      taskId: rate.taskId,
      dates: [{ date: rate.date, completionRate: rate.completionRate }],
    }));

    return completionRatesWithDetails;
  } catch (error) {
    console.error("Error fetching task completion rates:", error);
    throw error;
  }
};

const updateTaskAsCompleted = async (id) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );
    if (updatedTask) {
      return updatedTask;
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update task"
    );
  }
};

module.exports = {
  createTodo,
  getAllTodo,
  getTaskById,
  getCompletedTask,
  getTaskCompletionRate,
  updateTaskAsCompleted,
};
