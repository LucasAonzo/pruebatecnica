const { Task } = require("../database.js");

const createTask = async (datos) => {
  const { id, title, description, created_at, due, completed } = datos;
  if (!title || !description || !due) {
    return "Faltan datos";
  }

  const newTask = await Task.create({
    id,
    title,
    description,
    created_at: created_at || new Date(),
    due,
    completed: completed,
  });
  return newTask;
};

const getAllTasks = async () => {
  const tasks = await Task.findAll();
  return tasks;
};
const getTaskById = async (id) => {
  const task = await Task.findByPk(id);
  return task;
};

const updateTask = async (id, datos) => {
  const { title, description, created_at, due, completed } = datos;
  const task = await Task.findByPk(id);
  if (!task) {
    throw new Error("No existe la tarea");
  }
  task.title = title;
  task.description = description;
  task.due = due;
  task.completed = completed;
  await task.save();
  return task;
};

const deleteTask = async (id) => {
  const task = await Task.findByPk(id);
  if (!task) {
    return "No existe la tarea";
  }
  await task.destroy();
  return "Tarea eliminada";
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
