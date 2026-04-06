const fs = require("fs");
const path = require("path");

const isTestEnv = process.env.NODE_ENV === "test";
const dataDirectory = path.join(__dirname, "..", "data");
const tasksFilePath = path.join(dataDirectory, "tasks.json");

let tasks = [];
let nextId = 1;

const ensureDataStore = () => {
  if (isTestEnv) {
    return;
  }

  fs.mkdirSync(dataDirectory, { recursive: true });

  if (!fs.existsSync(tasksFilePath)) {
    fs.writeFileSync(tasksFilePath, "[]", "utf8");
  }
};

const saveTasks = () => {
  if (isTestEnv) {
    return;
  }

  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
};

const setNextId = () => {
  const highestId = tasks.reduce(
    (currentHighest, task) =>
      task.id > currentHighest ? task.id : currentHighest,
    0
  );

  nextId = highestId + 1;
};

const loadTasks = () => {
  if (isTestEnv) {
    tasks = [];
    nextId = 1;
    return;
  }

  ensureDataStore();

  try {
    const fileContents = fs.readFileSync(tasksFilePath, "utf8");
    const parsedTasks = JSON.parse(fileContents);

    tasks = Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch (error) {
    tasks = [];
    saveTasks();
  }

  setNextId();
};

const getAllTasks = () => tasks;

const createTask = ({ title, description, status, priority }) => {
  const newTask = {
    id: nextId,
    title,
    description,
    status,
    priority,
  };

  nextId += 1;
  tasks.push(newTask);
  saveTasks();
  return newTask;
};

const updateTaskById = (taskId, updates) => {
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return null;
  }

  const { title, description, status, priority } = updates;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;

  saveTasks();
  return task;
};

const deleteTaskById = (taskId) => {
  const taskIndex = tasks.findIndex((item) => item.id === taskId);

  if (taskIndex === -1) {
    return null;
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);
  saveTasks();
  return deletedTask;
};

loadTasks();

module.exports = {
  getAllTasks,
  createTask,
  updateTaskById,
  deleteTaskById,
};
