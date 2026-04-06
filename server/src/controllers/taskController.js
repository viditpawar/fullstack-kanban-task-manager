const {
  getAllTasks: getAllTasksFromModel,
  createTask: createTaskInModel,
  updateTaskById,
  deleteTaskById,
} = require("../models/taskModel");

const getAllTasks = (req, res) => {
  res.status(200).json(getAllTasksFromModel());
};

const createTask = (req, res) => {
  const { title, description, status, priority } = req.body;

  if (!title || !description || !status || !priority) {
    return res.status(400).json({
      message: "Title, description, status, and priority are required.",
    });
  }

  const newTask = createTaskInModel({
    title,
    description,
    status,
    priority,
  });

  return res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { title, description, status, priority } = req.body;

  const updatedTask = updateTaskById(taskId, {
    title,
    description,
    status,
    priority,
  });

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found." });
  }

  return res.status(200).json(updatedTask);
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const deletedTask = deleteTaskById(taskId);

  if (!deletedTask) {
    return res.status(404).json({ message: "Task not found." });
  }

  return res.status(200).json({
    message: "Task deleted successfully.",
    task: deletedTask,
  });
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
