import { validationResult } from "express-validator";
import {
  constructError,
  extractErrorMessages,
  isEmpty,
} from "../../utils/helpers.js";
import Models from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const errors = validationResult(req);
  const { username, password } = req.body;

  if (!errors.isEmpty()) {
    const errorMessages = extractErrorMessages(errors.array());
    return res.status(400).json({ error: true, message: errorMessages });
  }

  const searchingUser = await Models.Users.findOne({ username }).lean();

  if (!searchingUser || isEmpty(searchingUser)) {
    return res.status(400).json({
      error: true,
      message: constructError("username", "No user with this username"),
    });
  }

  const hashCompareResult = await bcrypt.compare(
    password,
    searchingUser.password
  );

  if (!hashCompareResult) {
    return res.status(400).json({
      error: true,
      message: constructError("password", "Wrong password"),
    });
  }

  let jwtOptions = {};

  if (process.env.NODE_ENV === "development") {
    jwtOptions.expiresIn = "1D";
  }

  const token = jwt.sign(
    {
      id: searchingUser._id.toString(),
      email: searchingUser.email,
      username: searchingUser.username,
      role: searchingUser.userType,
    },
    process.env.TOKEN_SECRET,
    jwtOptions
  );

  req.user = searchingUser;
  req.token = token;

  return res.status(200).json({ message: "Login Success!", token });
};
