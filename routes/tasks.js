const express = require('express');
const Task = require('../models/Task');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Middleware to authenticate JWT token
router.use(authenticateToken);

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;
    const task = new Task({
      title,
      description,
      deadline,
      priority,
      user: req.user.userId,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Get all tasks for the authenticated user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, description, deadline, priority },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Search tasks
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const tasks = await Task.find({
      user: req.user.userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search tasks' });
  }
});

// Filter tasks
router.get('/filter', async (req, res) => {
  try {
    const { priority, dueDate } = req.query;
    const filter = { user: req.user.userId };
    if (priority) {
      filter.priority = priority;
    }
    if (dueDate) {
      filter.deadline = { $lte: new Date(dueDate) };
    }
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter tasks' });
  }
});

module.exports = router;

