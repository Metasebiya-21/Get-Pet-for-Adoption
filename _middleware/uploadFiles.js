const path = require("path")
const multer = require("multer");
const { nextTick } = require("process");


const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "public/petImages",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});
const imageUpload = multer({
  storage: imageStorage,

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|JPG|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

module.exports = imageUpload