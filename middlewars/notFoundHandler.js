export default (req, res) => {
  res.status(404).json({ message: "route not found!" });
};
