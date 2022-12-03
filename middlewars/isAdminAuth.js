export default async (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({ error: true, message: "You're not allowed" });
};
