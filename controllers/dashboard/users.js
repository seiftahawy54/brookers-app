import Models from "../../models/index.js";
import mongoose from "mongoose";
import { constructError } from "../../utils/helpers.js";
import { usersTypes } from "../../models/users.js";

const getAllUsers = async (req, res) => {
  const allUsers = await Models.Users.find({});
  if (!allUsers) {
    return res.status(200).json({ users: [] });
  }
  return res.status(200).json({ users: allUsers });
};

const deleteOneUser = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.isValidObjectId(mongoose.Types.ObjectId(userId)))
    return res
      .status(400)
      .json({ error: true, message: constructError("user id", "not correct") });

  const findUserResult = await Models.Users.findByIdAndRemove(userId);
  return res
    .status(200)
    .json({ message: "User deleted successfully", findUserResult });
};

export const putChangeUserType = async (req, res, next) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  if (!mongoose.isValidObjectId(mongoose.Types.ObjectId(id)))
    return res
      .status(400)
      .json({ error: true, message: constructError("user id", "not correct") });

  if (!usersTypes.includes(newStatus))
    return res.status(400).json({
      error: true,
      message: constructError("New status", "invalid value"),
    });

  try {
    const user = await Models.Users.findById(id);
    if (!user)
      return res.status(404).json({ error: true, message: "User not found" });

    user.userType = newStatus;
    await user.save();
    return res.status(200).json({ message: "New status saved successfully" });
  } catch (e) {
    next(e);
  }
};

export default { getAllUsers, deleteOneUser, putChangeUserType };
