const httpStatus = require("http-status");
const taskService = require("../services/todo.service");

const createTodo = async (req, res) => {
  try {
    const newTask = await taskService.createTodo(req.body);
    res.status(httpStatus.CREATED).send(newTask);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Failed to create a new task",
    });
  }
};

const getAllTodo = async (req, res) => {
  try {
    const tasks = await taskService.getAllTodo();
    res.status(httpStatus.OK).send(tasks);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({
      error: "No tasks found",
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    ("Task not found");
    const task = await taskService.getTaskById(taskId);
    res.status(httpStatus.OK).send(task);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({
      error: "Task not found",
    });
  }
};

const getCompletedTask = async (req, res) => {
  try {
    const completedTasks = await taskService.getCompletedTask();
    if (completedTasks.length > 0) {
      res.status(httpStatus.OK).send(completedTasks);
    } else {
      res.status(httpStatus.NOT_FOUND).send({
        error: "No completed tasks found",
      });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Failed to get completed tasks",
    });
  }
};

const getTaskCompletionRate = async (req, res) => {
  try {
    const completionRate = await taskService.getTaskCompletionRate();
    res.status(httpStatus.OK).send(completionRate);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "Failed to get task completion rate",
    });
  }
};

const updateTaskAsCompleted = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await taskService.updateTaskAsCompleted(taskId);
    res.status(httpStatus.OK).send(updatedTask);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).send({
      error: "Task not found",
    });
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
