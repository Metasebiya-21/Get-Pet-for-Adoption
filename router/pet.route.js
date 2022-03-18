const express = require("express");
const path = require("path")
const multer = require("multer")
const { auth, petCtrl } = require("../controllers");
const { authUser, validator, imageUpload } = require("../_middleware");
const route = express.Router();

route.post("/create_pet",imageUpload.array("photo"), petCtrl.createPet);
route.get("/get_pets", petCtrl.getPets);

module.exports = route
