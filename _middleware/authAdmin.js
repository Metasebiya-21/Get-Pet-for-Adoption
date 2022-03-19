const _ = require("lodash");
const { admin } = require("../models");
<<<<<<< HEAD

=======
const jwt = require("jsonwebtoken");
const expressJ = require("express-jwt");
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
const {
  notifyUser,
  errorHandler,
  sendData,
<<<<<<< HEAD
  recordExists,
=======
  handleDuplicate,
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
} = require("../_helper");
const {user } = require("../models")

exports.checkRecord = async (req, res, next) => {
  try {
    let { phoneNumber } = req.body;
    let u = user
      .findOne({
        phoneNumber,
      })
      .then((user) => {
        if (!user) {
          next();
        } else {
<<<<<<< HEAD
          recordExists("admin already exists!", res);
=======
          handleDuplicate("admin already exists!", res);
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
        }
      });
  } catch (err) {
    errorHandler(err, res);
  }
};

<<<<<<< HEAD
=======
exports.requireSignin = expressJ({
  secret: process.env.LOGIN_SECRET,
  algorithms: ["HS256"],
});

>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
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
exports.checkAdmin = (req, res, next) => {
  if (req.profile.role === "admin") {
    next();
  } else {
    notifyUser("admin with this email/username not found!");
  }
};
