/* eslint-disable no-underscore-dangle */
const express = require("express");
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

// POST request to create a new user
router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  return res.json(user);
});

// POST request to login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  return res.json({ message: "Login successful", id: user.id });
});

// GET request to get a list of all users
router.get("/list", async (req, res) => {
  try {
    const users = await User.find().select("username profilePicture status");
    return res.json(users);
  } catch (error) {
    return res.status(500).send({ message: "Error finding users", error });
  }
});

// PUT request to send a message
router.put("/send-message", async (req, res) => {
  const { userId, conversationId, messageContent } = req.body;

  const user = await User.findById(userId);
  const conversation = await Conversation.findById(conversationId);

  if (!user || !conversation) {
    return res.status(404).send({ message: "User or conversation not found" });
  }

  const message = new Message({
    author: userId,
    content: messageContent,
  });

  await message.save();

  conversation.messages.push(message._id);

  await conversation.save();

  return res.status(200).send(message);
});

// PUT request to create a conversation
router.put("/create-conversation", async (req, res) => {
  const { userId, contactId } = req.body;

  const user = await User.findById(userId);
  const contact = await User.findById(contactId);

  if (!user || !contact) {
    return res.status(404).send({ message: "User not found" });
  }

  if (!user.conversations) {
    user.conversations = [];
  }

  if (!contact.conversations) {
    contact.conversations = [];
  }

  const conversation = new Conversation({
    participants: [userId, contactId],
  });

  await conversation.save();

  user.conversations.push(conversation._id);
  contact.conversations.push(conversation._id);

  await user.save();
  await contact.save();

  return res.status(200).send({ message: "Conversation created" });
});

// PUT request to accept a contact request
router.put("/accept-contact-request", async (req, res) => {
  const { userId, contactId } = req.body;

  try {
    const user = await User.findById(userId);
    const contact = await User.findById(contactId);

    if (!user || !contact) {
      return res.status(404).send({ message: "User not found" });
    }

    const pendingIndex = user.pending.findIndex(
      (pending) => pending.user.toString() === contactId,
    );
    if (pendingIndex === -1) {
      return res.status(400).send({ message: "Request not found" });
    }

    user.pending.splice(pendingIndex, 1);
    user.contacts.push(contactId);

    const contactPendingIndex = contact.pending.findIndex(
      (pending) => pending.user.toString() === userId,
    );
    contact.pending.splice(contactPendingIndex, 1);
    contact.contacts.push(userId);

    await user.save();
    await contact.save();

    return res.status(200).send({ message: "Request accepted" });
  } catch (error) {
    return res.status(500).send({ message: "Error accepting request", error });
  }
});

// PUT request to reject a contact request
router.put("/reject-contact-request", async (req, res) => {
  const { userId, contactId } = req.body;

  try {
    const user = await User.findById(userId);
    const contact = await User.findById(contactId);

    if (!user || !contact) {
      return res.status(404).send({ message: "User not found" });
    }

    const pendingIndex = user.pending.findIndex(
      (pending) => pending.user.toString() === contactId,
    );
    if (pendingIndex === -1) {
      return res.status(400).send({ message: "Request not found" });
    }

    user.pending.splice(pendingIndex, 1);

    const contactPendingIndex = contact.pending.findIndex(
      (pending) => pending.user.toString() === userId,
    );
    contact.pending.splice(contactPendingIndex, 1);

    await user.save();
    await contact.save();

    return res.status(200).send({ message: "Request rejected" });
  } catch (error) {
    return res.status(500).send({ message: "Error rejecting request", error });
  }
});

// PUT request to add a contact
router.put("/add-contact", async (req, res) => {
  const { userId, contactId } = req.body;

  try {
    const user = await User.findById(userId);
    const contact = await User.findById(contactId);

    if (!user || !contact) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    if (user.contacts.includes(contactId)) {
      res.status(400).send({ message: "User already added" });
      return;
    }
    if (userId === contactId) {
      res.status(400).send({ message: "Cannot add self as contact" });
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
    res.status(500).send({ message: "Error finding contact", error });
  }

  res.status(200).send({ message: "Contact added" });
});

// PUT request to delete a contact
router.put("/delete-contact", async (req, res) => {
  const { userId, contactId } = req.body;

  try {
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { $pull: { contacts: contactId } },
      { new: true },
    );

    const contactUpdate = await User.findByIdAndUpdate(
      contactId,
      { $pull: { contacts: userId } },
      { new: true },
    );

    if (!userUpdate || !contactUpdate) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    res.status(200).send({ message: "Contact removed" });
  } catch (error) {
    res.status(500).send({ message: "Error removing contact", error });
  }
});

// PUT request to delete a conversation
router.put("/remove-conversation", async (req, res) => {
  const { userId, conversationId } = req.body;

  try {
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { $pull: { conversations: conversationId } },
      { new: true },
    );

    if (!userUpdate) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    res.send({ message: "Conversation removed" });
  } catch (error) {
    res.status(500).send({ message: "Error removing conversation", error });
  }
});

// PUT request to send a contact request
router.put("/send-contact-request", async (req, res) => {
  const { userId, contactId } = req.body;

  try {
    const user = await User.findById(userId);
    const contact = await User.findById(contactId);

    if (!user || !contact) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.pending.some((pending) => pending.user.toString() === contactId)) {
      return res.status(400).send({ message: "Request already sent" });
    }
    if (user.contacts.includes(contactId)) {
      return res.status(400).send({ message: "User already added" });
    }
    if (userId === contactId) {
      return res.status(400).send({ message: "Cannot add self as contact" });
    }

    if (!user.pending) {
      user.pending = [];
    }
    if (!contact.pending) {
      contact.pending = [];
    }

    user.pending.push({ user: contactId, pendingStatus: "outgoing" });
    contact.pending.push({ user: userId, pendingStatus: "incoming" });

    await user.save();
    await contact.save();

    res.status(200).send({ message: "Request sent" });
  } catch (error) {
    res.status(500).send({ message: "Error sending request", error });
  }
  return null;
});

// GET user settings
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    return res.status(500).send({ message: "Error finding user", error });
  }
});

// GET a user's contacts
router.get("/:id/contacts", async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "contacts",
    select: "username status profilePicture",
  });
  return res.json(user.contacts);
});

// GET a user's conversations
router.get("/:id/direct-messages", async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "conversations",
    populate: [
      {
        path: "participants",
        select: "username status profilePicture",
      },
      {
        path: "messages",
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      },
    ],
  });
  return res.json(user.conversations);
});

// GET a user's pending contacts
router.get("/:id/pending", async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "pending.user",
    select: "username status profilePicture",
  });
  return res.json(user.pending);
});

module.exports = router;
