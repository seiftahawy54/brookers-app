import crypto from "crypto";
import multer from "multer";
import * as path from "path";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, path.resolve("uploads"));
  },
  filename: (req, file, cb) => {
    const newFileName =
      crypto.randomBytes(10).toString("hex") + "-" + file.originalname;
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: fileStorage,
  fileFilter,
});

export default upload;
