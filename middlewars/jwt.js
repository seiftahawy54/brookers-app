import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const token = req.headers('authorization').split(' ').at(-1);

  if (!token) {
    return res.status(403).json({error: true, message: "Invalid token!"});
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
  } catch (e) {
    return res.status(401).json({error: true, message: "Invalid token!"})
  }

  return next();
}
