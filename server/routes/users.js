const express = require('express');
const User = require('../models/User');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST request to create a new user
router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

module.exports = router;
