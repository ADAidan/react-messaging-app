const express = require('express');
const User = require('../models/User');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

// GET user settings
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.json(user);
});

router.get('/:id/contacts', async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.json(user.contacts);
});

router.get('/:id/direct-messages', async (req, res) => { 
  const user = await User.findById(req.params.id);
  if (!user.conversations.length) {
    return res.json([]);
  }
  return res.json(user.directMessages);
});

// POST request to create a new user
router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  return res.json(user);
});

// POST request to login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  return res.json({ message: 'Login successful', id: user.id });
});

module.exports = router;
