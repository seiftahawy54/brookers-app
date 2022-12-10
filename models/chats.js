import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    firstUser: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    secondUser: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    messages: [
      {
        text: String,
        sender: {
          type: mongoose.Types.ObjectId,
          ref: "user",
          required: true,
        },
        receiver: {
          type: mongoose.Types.ObjectId,
          ref: "user",
          required: true,
        },
        time: {
          type: Date,
          defaultValue: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", ChatSchema);

export default Chat;
