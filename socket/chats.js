import Models from "../models/index.js";
import { isAuthSocket } from "../middlewars/isAuth.js";
import mongoose from "mongoose";

export default (io) => {
  const chatsNsp = io.of("/sockets/chats");
  chatsNsp.on("connect", (socket, next) => {
    const user = isAuthSocket(socket, next);
    try {
      if (!user) {
        return new Error("user is not valid!");
      }
    } catch (e) {
      console.error(e);
    }

    socket.on("joinChat", (chatProps) => {
      console.log(chatProps);
      socket.join(chatProps.chatId);
    });

    socket.on("sendMessage", async (chatData) => {
      try {
        if (
          !mongoose.isValidObjectId(chatData.content.otherUserId) ||
          !mongoose.isValidObjectId(chatData.content.chatId)
        ) {
          console.log(chatData);
          return false;
        }
      } catch (e) {
        throw new Error(e);
      }

      try {
        const otherUser = await Models.Users.findById(
          chatData.content.otherUserId
        );
        const currentUser = await Models.Users.findById(user.id);
        const chatConversation = await Models.Chats.findById(
          chatData.content.chatId
        );

        if (!otherUser || !currentUser || !chatConversation) {
          return new Error("Some user is not found!");
        }

        chatConversation.messages = [
          ...chatConversation.messages,
          {
            text: chatData.content.message,
            sender: currentUser._id,
            receiver: otherUser._id,
          },
        ];

        socket.to(chatData.content.chatId).emit("sendMessage", chatData);

        await chatConversation.save();
      } catch (e) {
        console.log(JSON.stringify(e));
        throw new Error(e);
      }
    });
  });
};
