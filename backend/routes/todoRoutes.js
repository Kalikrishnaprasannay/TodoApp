const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id }).populate('categoryId');
  res.json(todos);
});

router.post('/', auth, async (req, res) => {
  const { text, categoryId } = req.body;
  const todo = await Todo.create({ text, categoryId, userId: req.user._id });
  res.status(201).json(todo);
});

router.delete('/:id', auth, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
