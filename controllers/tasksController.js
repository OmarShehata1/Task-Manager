const Task = require("../models/taskModel");
const asyncWrapper = require("../Middlewares/async");

const getAllTasks = asyncWrapper( async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({
    tasks,
    amount: tasks.length,
  });
});

const getTask = asyncWrapper( async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ msg: "Not found" });
  }
  res.status(200).json({ task });
});

const createTask =asyncWrapper( async (req, res) => {
  const task = req.body;
  const newTask = await Task.create(task);
  res.status(201).json({
    task: newTask,
  });
});

const updateTask =asyncWrapper( async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: "Not found" });
  }
  res.status(200).json({ task });
});

const deleteTask =asyncWrapper( async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.status(404).json({ msg: "Not found" });
  }
  res.status(200).json({ task: null, status: "success" });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
