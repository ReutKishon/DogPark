import multer from "multer";
import { diskStorage } from "multer";
import { extname } from "path";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/"); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
