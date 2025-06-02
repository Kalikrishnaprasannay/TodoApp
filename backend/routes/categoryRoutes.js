const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  const categories = await Category.find({ userId: req.user._id });
  res.json(categories);
});

router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name, userId: req.user._id });
  res.status(201).json(category);
});

module.exports = router;
