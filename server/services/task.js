const Task = require("../models/tasks");

const addTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const { user } = req;
    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }
    if (title.length < 6) {
      return res.status(400).json({ error: "Title must have 6 characters" });
    }
    if (description.length < 6) {
      return res
        .status(400)
        .json({ error: "Description must have 6 characters" });
    }
    const newTask = new Task({ title, description, priority, status });
    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save();
    return res.status(200).json({ success: "Task added" });
  } catch (err) {
    return res.status(404).json({ error: "Internal Server Error" });
  }
};
const eidtTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, priority, status } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }
    if (title.length < 6) {
      return res.status(400).json({ error: "Title must have 6 characters" });
    }
    if (description.length < 6) {
      return res
        .status(400)
        .json({ error: "Description must have 6 characters" });
    }
    await Task.findByIdAndUpdate(id, { title, description, priority, status });
    return res.status(200).json({ success: "Task updated" });
  } catch (err) {
    return res.status(404).json({ error: "Internal Server Error" });
  }
};
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskDetails = await Task.findById(id);
    return res.status(200).json({ taskDetails });
  } catch (err) {
    return res.status(404).json({ error: "Internal Server Error" });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ success: "task deleted successfully" });
  } catch (err) {
    return res.status(404).json({ error: "Internal Server Error" });
  }
};

module.exports = { addTask, eidtTask, getTask, deleteTask };
