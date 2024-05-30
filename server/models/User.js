const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contacts: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pending: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        pendingStatus: {
          type: String,
          enum: ["outgoing", "incoming"],
        },
      },
    ],
    conversations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
    profilePicture: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Offline",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
