import mongoose from "mongoose";
import Models from "../../models/index.js";
import { constructError, extractErrorMessages } from "../../utils/helpers.js";
import { validationResult } from "express-validator";

const getUserData = async (req, res) => {
  const { id } = req.user;
  if (!mongoose.isValidObjectId(mongoose.Types.ObjectId(id)))
    return res
      .status(400)
      .json({ error: true, message: constructError("id", "invalid") });

  const user = await Models.Users.findOne({
    _id: mongoose.Types.ObjectId(id),
  });

  if (!user) return res.status(404).json({ user: {} });

  return res.status(200).json({ user });
};

const putUpdateUserData = async (req, res, next) => {
  const errors = validationResult(req.body);

  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ error: true, message: extractErrorMessages(errors.array()) });

  const user = await Models.Users.findById(req.user.id);

  if (!user)
    return res
      .status(404)
      .json({ error: true, message: constructError("user", "not found") });

  try {
    for (let key in req.body) user[key] = req.body[key];
    console.log(user);
    await user.save();
    return res
      .status(200)
      .json({ message: "New data was saved successfully!" });
  } catch (e) {
    next(e);
  }
};

export default { getUserData, putUpdateUserData };
