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

  /* try {
    // Add the contact to the user's contacts
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { contacts: contactId } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Add the user to the receiving user's contacts
    const receivingUser = await User.findByIdAndUpdate(
      contactId,
      { $push: { contacts: userId }},
      { new: true } // Return the updated document
    );

    // If the receiving user is not found, remove the contact from the user's contacts
    if (!receivingUser) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { contacts: contactId }},
        { new: true }
      );
      await User.findByIdAndUpdate(
        contactId,
        { $pull: { contacts: userId }},
        { new: true }
      );
      return res.status(404).send({ message: 'Error receiving request' });
    }

    res.status(200).send({ updatedUser, receivingUser });
  } catch (error) {
    res.status(500).send({ message: 'Error adding contact', error });
  } */
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
