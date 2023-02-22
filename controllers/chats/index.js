import mongoose from "mongoose";
import { constructError } from "../../utils/helpers.js";
import Models from "../../models/index.js";

const getChatForUser = async (req, res, next) => {
  const { id } = req.user;
  const chat = await Models.Chats.find({
    $or: [{ firstUser: id }, { secondUser: id }],
  })
    .populate("firstUser secondUser")
    .lean();

  if (!chat) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ chat });
};

const postCreateChat = async (req, res, next) => {
  const { otherUserId } = req.params;

  if (!mongoose.isValidObjectId(otherUserId))
    return res.status(400).json({
      error: true,
      message: constructError("other user id", "Invalid other user id"),
    });

  if (otherUserId === req.user.id) {
    return res.status(400).json({
      message: "Cannot create chat for the same user!",
    });
  }

  const otherUser = await Models.Users.findById(otherUserId).lean();

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

    const addedChat = await Models.Chats.findById(chat._id).populate(
      "firstUser secondUser"
    );

    return res.status(200).json({
      message: "Chat created successfully",
      chat: addedChat,
    });
  } catch (e) {
    next(e);
  }
};

export default { postCreateChat, getChatForUser };
