import Models from "../../models/index.js";
import mongoose from "mongoose";
import { constructError } from "../../utils/helpers.js";

const getAllUsers = async (req, res) => {
  const allUsers = await Models.Users.find({});
  if (!allUsers) {
    return res.status(200).json({ users: [] });
  }
  return res.status(200).json({ users: allUsers });
};

const deleteOneUser = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.isValidObjectId(mongoose.Types.ObjectId(userId))) {
    return res
      .status(400)
      .json({ error: true, message: constructError("user id", "not correct") });
  }

  const findUserResult = await Models.Users.findByIdAndRemove(userId);
  console.log(findUserResult);
  return res
    .status(200)
    .json({ message: "User deleted successfully", findUserResult });
};

export default { getAllUsers, deleteOneUser };
