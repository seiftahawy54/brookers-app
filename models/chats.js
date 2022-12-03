import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    messages: [
      {
        text: String,
        sender: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
        sendTime: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", ChatSchema);

export default Chat;
