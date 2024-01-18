import multer from "multer";
import path from "path";

const supportedTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/webp",
    "image/svg+xml",
  ];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(supportedTypes.includes(file.mimetype));
    if (!supportedTypes.includes(file.mimetype)) {
      cb(new Error("Unsupported file format"), false);
    } else {
      cb(null, true);
    }
  },
});

export default upload.single("avatar");
