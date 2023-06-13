const express = require("express");
const taskController = require("../controllers/todo.controller");

const router = express.Router();

router.route("/").post(taskController.createTodo);
router.route("/").get(taskController.getAllTodo);
router.route("/:id").get(taskController.getTaskById);
router.route("/tasks/completion-rate").get(taskController.getTaskCompletionRate);
router.route("/:id/completed").put(taskController.updateTaskAsCompleted);
router.route("/tasks/completed").get(taskController.getCompletedTask);




module.exports = router;
