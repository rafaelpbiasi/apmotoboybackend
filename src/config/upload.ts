import multer = require("multer");

export function upload() {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "-" + file.originalname + ".jpeg");
      },
    }),
  });
}