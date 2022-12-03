import { validationResult } from "express-validator";
import {
  constructError,
  extractErrorMessages,
  isEmpty,
} from "../../utils/helpers.js";
import Models from "../../models/index.js";
import bcrypt from "bcrypt";

export default async (req, res, next) => {
  const errors = validationResult(req);
  const {
    fullname,
    email,
    age,
    nationalId,
    username,
    password,
    confirmPassword,
  } = req.body;

  if (!errors.isEmpty()) {
    const errorMessages = extractErrorMessages(errors.array());
    return res.status(400).json({ error: true, message: errorMessages });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      error: true,
      message: constructError("password", "Passwords are not equal"),
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const findingUserWithSameNationalId = await Models.Users.find({
      nationalId,
    }).lean();

    if (!isEmpty(findingUserWithSameNationalId)) {
      return res.status(400).json({
        error: true,
        message: constructError("nationalId", "Duplicate national id"),
      });
    }

    const findingUserWithSameUsername = await Models.Users.find({
      username,
    }).lean();

    if (!isEmpty(findingUserWithSameUsername)) {
      return res.status(400).json({
        error: true,
        message: constructError("username", "Duplicate username"),
      });
    }

    const newUser = new Models.Users({
      fullname,
      age,
      nationalId,
      username,
      password: hashedPassword,
      email,
    });

    const userWallet = new Models.Wallets({ user: newUser._id });
    newUser.wallet = userWallet._id;

    await newUser.save();
    await userWallet.save();

    return res.status(200).json({ message: "User data saved successfully" });
  } catch (e) {
    e.statusCode = 500;
    return next(e);
  }
};
