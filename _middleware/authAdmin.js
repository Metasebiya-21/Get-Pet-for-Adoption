const _ = require("lodash");
const { admin } = require("../models");
const {
  notifyUser,
  errorHandler,
  sendData,
  duplicateError,
} = require("../_helper");
const {user } = require("../models")

exports.checkRecord = async (req, res, next) => {
  try {
    let { phoneNumber, email } = req.body;
    let u = user
      .findOne({
        $or:[{phoneNumber}, {email}],
      })
      .then((user) => {
        if (!user) {
          next();
        } else {
          duplicateError("admin already exists!", res);
        }
      });
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.authMiddleware = (req, res, next) => {
  try {
    let authUserId = req.user.id;
    return db.admin
      .findOne({ where: { id: authUserId } })
      .then((user) => {
        if (!(user === null)) {
          req.profile = user;
          next();
        } else {
          notifyUser("user does not exist! please signUp first", res);
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
