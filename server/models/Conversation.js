const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const ConversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Conversation = Mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
