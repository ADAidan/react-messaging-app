const Mongoose = require('mongoose');

const { Schema } = Mongoose;

const MessageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Message = Mongoose.model('Message', MessageSchema);

module.exports = Message;
