const express = require("express");
const path = require("path")
const multer = require("multer")
const { auth, petCtrl } = require("../controllers");
const { authUser, validator, imageUpload } = require("../_middleware");
const route = express.Router();

route.post(
  "/create_pet",
  validator.checkPetRecord,
  imageUpload.array("photo"),
  petCtrl.createPet
);
route.get("/get_pets", petCtrl.getPets);
route.get("/profile/:tag", petCtrl.getProfile)

route.get("/image/:filename", (req, res) => {
  let { filename } = req.params;
  let file_path = path.resolve(__dirname, "../public/petImages", filename);
  console.log("file ", file_path);
  res.status(200).sendFile(file_path);
});
module.exports = route
