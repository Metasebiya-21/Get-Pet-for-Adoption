const _ = require("lodash");
const { user } = require("../models");
const moment = require("moment");
let generator = require("generate-password");
const { result } = require("lodash");
const {
  errorHandler,
  notifyUser,
  sendData,
  dbErrorHandler,
  duplicateError,
} = require("../_helper");
/**
 * admin auth
 */

exports.Signup = async (req, res) => {
  try {
    let { firstName, lastName, gender, BoD, email, phoneNumber, password } =
      req.body;
    BoD = moment(BoD, "DD. M. YYYY"); // this will be valid moment date now
    let role = "admin";
    let admin = new user({
      firstName,
      lastName,
      gender,
      BoD,
      email,
      phoneNumber,
      password,
      role,
    });

    admin
      .save()
      .then(() => {
        notifyUser("admin registered successfully!", res);
      })
      .catch((err) => {
        err = dbErrorHandler(err);
        throw err;
      });
  } catch (err) {
    duplicateError(err, res);
  }
};

exports.Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = user
      .findOne({
        email,
      })
      .then((data) => {
        if (data) {
          console.log("data ", data.hashed_password);
          const validPassword = data.authentication(password);
          if (validPassword) {
            data.salt = undefined;
            data.hashed_password = undefined;
            sendData({ status: "success", customer_id: data._id }, res);
          } else {
            errorHandler("incorrect credentials, please try again!", res);
          }
        } else {
          errorHandler("incorrect credentials, please try again!", res);
        }
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    errorHandler(err, res);
  }
};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await db.user
      .findOne({
        where: {
          email,
        },
      })
      .then(() => {
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_RESET_SECRET,
          { expiresIn: "30m" }
        );

        let emailData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: "Email Verification",
          html: `<div>
        <h1>please, use the following link to reset your password, </h1>
        <a href="http://${process.env.CLIENT_URL}/auth/account/resetpassword/${token}" target="_blank">click here to reset your password</a>
        </div>`,
        };
        return user
          .updateOne({ resetPasswordToken: token })
          .then((user) => {
            sendData({ user: user }, res);
          })
          .catch((err) => {
            errorHandler(err, res);
          });
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (err) {
    errorHandler(err, res);
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  notifyUser("Signout success!", res);
};
