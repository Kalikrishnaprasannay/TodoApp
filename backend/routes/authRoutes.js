const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hash });
  res.status(201).json({ message: 'User created' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

module.exports = router;
