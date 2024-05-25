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

// GET user contact -- not used
router.get('/:id/contact', async (req, res) => {
  const user = await User.findById(req.params.id);

  const { username, status, profilePicture } = user;

  return res.json({ username, status, profilePicture });
});

// GET a user's contacts
router.get('/:id/contacts', async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: 'contacts',
    select: 'username status profilePicture',
  });
  return res.json(user.contacts);
});

// GET a user's pending contacts
router.get('/:id/pending', async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: 'pending.user',
    select: 'username status profilePicture',
  });
  return res.json(user.pending);
});

// GET a user's conversations
router.get('/:id/direct-messages', async (req, res) => { 
  const user = await User.findById(req.params.id);
  if (!user.conversations.length) {
    return res.json([]);
  }
  return res.json(user.directMessages);
});

// PUT request to add a contact
router.put('/:userId/add-contact', async (req, res) => {
  const { userId } = req.params;
  const { contactId } = req.body;

  try {
    const user = await User.findById(userId);
    const contact = await User.findById(contactId);

    if (!user || !contact) { 
      res.status(404).send({ message: 'User not found' });
      return;
    }
    if (user.contacts.includes(contactId)) {
      res.status(400).send({ message: 'User already added' });
      return;
    }
    if (userId === contactId) {
      res.status(400).send({ message: 'Cannot add self as contact' });
      return;
    }

    if (!user.contacts) {
      user.contacts = [];
    }
    if (!contact.contacts) {
      contact.contacts = [];
    }

    user.contacts.push(contactId);
    contact.contacts.push(userId);

    await user.save();
    await contact.save();
  } catch (error) {
    res.status(500).send({ message: 'Error finding contact', error });
  }

  res.status(200).send({ message: 'Contact added' });
});

// PUT request to send a contact request
router.put('/:userId/send-contact-request', async (req, res) => {
  const { userId } = req.params;
  const { contactId } = req.body;

  try {
    const user = await User.findById(userId);
    const contact = await User.findById(contactId);
    
    if (!user || !contact) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (user.pending.some((pending) => pending.user.toString() === contactId)) {
      return res.status(400).send({ message: 'Request already sent' });
    }
    if (user.contacts.includes(contactId)) {
      return res.status(400).send({ message: 'User already added' });
    }
    if (userId === contactId) {
      return res.status(400).send({ message: 'Cannot add self as contact' });
    }

    if (!user.pending) {
      user.pending = [];
    }
    if (!contact.pending) {
      contact.pending = [];
    }

    user.pending.push({ user: contactId, pendingStatus: 'outgoing' });
    contact.pending.push({ user: userId, pendingStatus: 'incoming' });

    await user.save();
    await contact.save();

    res.status(200).send({ message: 'Request sent' });
  } catch (error) {
    res.status(500).send({ message: 'Error sending request', error });
  }
  return null;
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
