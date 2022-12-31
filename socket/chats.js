import Models from "../models/index.js";
import { isAuthSocket } from "../middlewars/isAuth.js";
import mongoose from "mongoose";

export default (io) => {
  const chatsNsp = io.of("/sockets/chats");
  chatsNsp.on("connect", (socket, next) => {
    const user = isAuthSocket(socket, next);
    if (!user) return;

    socket.on("sendMessage", async (chatData) => {
      try {
        if (
          !mongoose.isValidObjectId(chatData.otherUserId) ||
          !mongoose.isValidObjectId(chatData.chatId)
        ) {
          console.log(chatData);
          return false;
        }
      } catch (e) {
        console.log(JSON.stringify(e));
        return false;
      }
      socket.join(chatData.chatId);
      socket.broadcast.to(chatData.otherUserId).emit(chatData);

      try {
        const otherUser = await Models.Users.findById(chatData.otherUserId);
        const currentUser = await Models.Users.findById(user.id);
        const chatConversation = await Models.Chats.findById(chatData.chatId);

        if (!otherUser || !currentUser || !chatConversation) return false;

        chatConversation.messages = [
          ...chatConversation.messages,
          {
            text: chatData.message,
            sender: currentUser._id,
            receiver: otherUser._id,
          },
        ];

        await chatConversation.save();
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    });
  });
};
