const express = require("express");
const { customerCtrl, petCtrl } = require("../controllers");
const { authUser, validator } = require("../_middleware");
const route = express.Router();

route.post("/add_customer", validator.checkRecord, customerCtrl.addCustomer);
route.post(
  "/adopt/:tag",
  authUser.authMiddleware,
  authUser.checkCustomer,
  authUser.checkPetAdopted,
  validator.checkPreviousRequest,
  petCtrl.adopt
);

route.get(
  "/get_adoption_requests",
  authUser.authMiddleware,
  authUser.checkAdmin,
  customerCtrl.getAdoptionRequest
);
route.post(
  "/grant_adoption_request/:requestId",
  authUser.authMiddleware,
  authUser.checkAdmin,
  customerCtrl.grantAdoption
);
route.get(
  "/generate_report",
  authUser.authMiddleware,
  authUser.checkAdmin,
  customerCtrl.generateReport
);



module.exports = route;
