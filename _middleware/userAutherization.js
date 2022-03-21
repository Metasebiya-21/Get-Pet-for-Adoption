const _ = require("lodash");
const db = require("../models");
const dotenv = require("dotenv");
dotenv.config();
const {
  notifyUser,
  errorHandler,
  sendData,
  duplicateError,
} = require("../_helper");
const { user, pet } = require("../models");

exports.checkRecord = async (req, res, next) => {
  try {
    let { phoneNumber, email } = req.body;
    let u = user
      .findOne({
        $or: [{ phoneNumber }, { email }],
      })
      .then((user) => {
        if (!user) {
          next();
        } else {
          duplicateError("user already exists!", res);
        }
      });
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.authMiddleware = (req, res, next) => {
  try {
    let { phoneNumber, email } = req.body;
    console.log(phoneNumber)
    user
      .findOne({ phoneNumber })
      .then((user) => {
        if (!(user === null)) {
          // console.log("auth middle ware ", user);
          req.profile = user;
          next();
        } else {
          errorHandler("user does not exist! please signUp first", res);
        }
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (error) {
    errorHandler(error, res);
  }
};
exports.checkAdmin = async (req, res, next) => {
  try {
    
    if (req.profile.role === "admin") {
      await user
        .findOne({
          where: {
            id: req.profile.id,
          },
        })
        .then((result) => {
          next();
        });
    } else {
      errorHandler("unautherized user!", res);
    }
  } catch (error) {
    errorHandler(error, res);
  }
};
exports.checkCustomer = async (req, res, next) => {
  try {
    console.log("req.profile.role ", req.profile.role);
    if (req.profile.role === "customer") {
      await user
        .findOne({
          where: {
            id: req.profile.id,
          },
        })
        .then((result) => {
          next();
        });
    } else {
      errorHandler("user is not customer", res);
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.checkPetAdopted = async (req, res, next) => {
  try {
    let tag = req.params.tag;
    console.log("checkPetAdopted pet tag ", tag);
    await pet
      .findOne({
        tag,
      })
      .then((result) => {
       if (result !== null){
          console.log("checkPetAdoptedresult: ", result.id);
          if (!result.adopted) {
            req.pet = result;
            console.log("checkPetAdoptedresult req.pet.id: ", req.pet.id);
            next();
          } else {
            errorHandler("this pet is already adopted", res);
          }
       }
       else{
         errorHandler("pet does not found!",res)
       }
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (error) {
    errorHandler(error, res);
  }
};
