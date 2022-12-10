import mongoose from "mongoose";
import { constructError } from "../../utils/helpers.js";
import Models from "../../models/index.js";

const getChatData = async (req, res, next) => {
  const { chatId } = req.params;

  if (!mongoose.isValidObjectId(userId))
    return res.status(400).json({
      error: true,
      message: constructError("userId", "Invalid userId"),
    });

  if (!mongoose.isValidObjectId(chatId))
    return res.status(400).json({
      error: true,
      message: constructError("chatId", "Invalid chatId"),
    });

  const chat = await Models.Chats.find({});
};

const postCreateChat = async (req, res, next) => {
  const { otherUserId } = req.params;

  if (!mongoose.isValidObjectId(otherUserId))
    return res.status(400).json({
      error: true,
      message: constructError("other user id", "Invalid other user id"),
    });

  const otherUser = await Models.Users.findById(otherUserId);

  if (!otherUser)
    return res.status(404).json({
      error: true,
      message: constructError("other user", "User not found"),
    });

  try {
    const oldChatV1 = await Models.Chats.findOne({
      firstUser: req.user.id,
      secondUser: otherUserId,
    });
    const oldChatV2 = await Models.Chats.findOne({
      firstUser: otherUserId,
      secondUser: req.user.id,
    });

    if (oldChatV1 && !oldChatV2)
      return res.status(200).json({
        message: "Chat is found",
        chat: oldChatV1,
      });
    else if (!oldChatV1 && oldChatV2)
      return res.status(200).json({
        message: "Chat is found",
        chat: oldChatV2,
      });

    const chat = new Models.Chats({
      firstUser: req.user.id,
      secondUser: otherUserId,
    });
    await chat.save();

    return res.status(200).json({
      message: "Chat created successfully",
      chat,
    });
  } catch (e) {
    next(e);
  }
};

export default { postCreateChat, getChatData };
