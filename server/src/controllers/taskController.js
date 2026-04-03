const { tasks } = require("../models/taskModel");

const getAllTasks = (req, res) => {
  res.status(200).json(tasks);
};

const createTask = (req, res) => {
  const { title, description, status, priority } = req.body;

  if (!title || !description || !status || !priority) {
    return res.status(400).json({
      message: "Title, description, status, and priority are required.",
    });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    status,
    priority,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { title, description, status, priority } = req.body;

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;

  res.status(200).json(task);
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((item) => item.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found." });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully.",
    task: deletedTask[0],
  });
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};