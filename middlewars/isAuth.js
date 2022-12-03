import jwt from "jsonwebtoken";

export const isAuthSocket = (socket) => {
  let token = socket.request.headers["auth"];

  if (!token) {
    return false;
  }

  let user;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    user = decoded;
  } catch (e) {
    return false;
  }

  return user;
};

export default async (req, res, next) => {
  let token = req.get("Authorization");

  if (!token) {
    return res.status(403).json({ error: true, message: "Invalid token!" });
  }

  token = token.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: true, message: "Invalid token!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
  } catch (e) {
    return res.status(401).json({ error: true, message: "Invalid token!" });
  }

  return next();
};
