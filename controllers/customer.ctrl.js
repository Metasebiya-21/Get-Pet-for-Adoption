const jwt = require("jsonwebtoken");
const expressJ = require("express-jwt");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const moment = require("moment");
const nodemailer = require("nodemailer");
const db = require("../models");
let generator = require("generate-password");
const { result } = require("lodash");
const {
  errorHandler,
  sendData,
  resolveAfterXSeconds,
  dbErrorHandler,
} = require("../_helper");

const { user, adoptionRequest, pet } = require("../models");

exports.addCustomer = async (req, res) => {
  try {
    let { firstName, lastName, gender, BoD, email, phoneNumber, password } =
      req.body;
    console.log("req.body ", BoD);
    let role = "customer";
    let customer = new user({
      firstName,
      lastName,
      gender,
      BoD,
      email,
      phoneNumber,
      password,
      role,
    });
    console.log("customer: ", customer);
    customer
      .save()
      .then((data) => {
        sendData({ status: "success", customer_id: data._id }, res);
      })
      .catch((err) => {
        console.log("err ", err);
        // error code: 11000 is a duplicate key error collection
        let errMsg = dbErrorHandler(err);
        errorHandler(errMsg, res);
      });
  } catch (error) {}
};

exports.getAdoptionRequest = async (req, res) => {
  try {
<<<<<<< HEAD
    let startDate = moment(new Date(req.body.startDate));
    let endDate = moment(new Date(req.body.endDate));

    adoptionRequest
      .find({ createdAt: { $gte: startDate, $lte: endDate } })
      .populate('customer_id').populate('pet_id')
      .then(async (requests) => {
        let data = []
       requests.forEach((adoption_request)=>{
          let {
            _id: customer_id,
            firstName,
            lastName,
            phoneNumber,
          } = adoption_request.customer_id;
          let {
            _id: pet_id,
            type,
            gender,
            size,
            age,
            good_with_children,
          } = adoption_request.pet_id;
          let name = `${firstName} ${lastName}`;
          data.push( {
              customer_id,
              name,
              phoneNumber,
              pet_id,
              type,
              gender,
              size,
              age,
              good_with_children,
            })
       })
        sendData({ status:"success", data }, res);
      })
      .catch((err) => {
        throw err
      });
  } catch (error) {
    errorHandler(err, res)
  }
=======
    adoptionRequest
      .find({})
      .then(async (requests) => {
        // sendData({request: result}, res)
        let data = [];
        requests.forEach((result, i) => {
          // console.log("customer_id:", result.customer_id);
          user.findById(result.customer_id).then(async (customer) => {
            let pet_ = await pet.findById(result.pet_id);
            // data.push(_.merge(customer, reqpett))
            data.push({ customer, pet_ });

            // console.log("data ", data);
          });
        });
        await resolveAfterXSeconds(3); //wating for 3 sec... to get the router rtp capabilities
        sendData({ request: data }, res);
      })
      .catch((err) => {
        errorHandler(err, res);
      });
  } catch (error) {}
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
};
exports.grantAdoption = async (req, res) => {
  try {
    let { requestId } = req.params;
    adoptionRequest
      .findByIdAndUpdate(requestId, { adoptionGrant: true })
      .then((result) => {
        let pet_id = result.pet_id;
        pet
          .findByIdAndUpdate(pet_id, {
            adopted: true,
            adoptedBy: result.customer_id,
            adoptedOn: Date.now(),
          })
          .then((result) => {
            sendData({ adoptedPet: result }, res);
          });
      });
  } catch (error) {}
};
exports.generateReport = async (req, res) => {
  try {
    let startDate = moment(new Date(req.body.startDate));
    let endDate = moment(new Date(req.body.endDate));

    let diff = moment.duration(endDate.diff(startDate));
    console.log("difference: ", { startDate, endDate });
    if (diff.days() < 7) {
      console.log("days less than a week: ", diff.days());
    } else {
      let total_weeks = diff.asWeeks();
      let weeks = [];
      let first_date = 0;
      let last_date = 0;
      for (let i = 0; i < total_weeks; i++) {
        let week_name = `week-${i}`;
<<<<<<< HEAD

        first_date = i === 0 ? startDate : last_date;
        last_date = last_date < endDate ? first_date + 7 : endDate;
=======
       
        first_date = i === 0 ? startDate : last_date;
        last_date = last_date < endDate ? first_date + 7: endDate;
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
        weeks.push({
          week_name: {
            first_date,
            last_date,
          },
        });
      }
<<<<<<< HEAD
      console.log("weeks: ", weeks);
=======
      console.log("weeks: ", weeks)
>>>>>>> cbd54858bf89a8cfeec217bf55c65311d3602248
    }
    pet
      .find({ adopted: true, adoptedOn: { $gte: startDate, $lte: endDate } })
      .then((result) => {
        let petType = [];
        let report = [];
        result.forEach((pet, i) => {
          petType.push(pet.type);
        });
        petType.forEach((type, i) => {
          pet.countDocuments({ type, adopted: true }).then((count) => {
            report = [{ type, count }];
            sendData({ adoptionreport: report }, res);
          });
        });
      });
  } catch (error) {
    errorHandler(error, res);
  }
};
