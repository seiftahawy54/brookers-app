export default (err, req, res, next) => {
  return res.status(500).json({ error: true, message: err.message });
};
