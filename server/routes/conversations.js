/* eslint-disable no-underscore-dangle */
const express = require('express');
const Conversation = require('../models/Conversation');

const router = express.Router();

// GET request to get all conversations
router.get('/', async (req, res) => {
  const conversations = await Conversation.find().populate('participants').populate('messages');
  return res.json(conversations);
});

// GET request to populate all messages in a conversation
router.get('/:id/', async (req, res) => { 
  const conversation = await Conversation.findById(req.params.id).populate('messages');
  return res.json(conversation);
});

module.exports = router;
