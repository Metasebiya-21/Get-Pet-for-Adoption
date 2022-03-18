const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const { pet, adoptionRequest } = require("../models");
const { _, result } = require("lodash");
var petfinder = require("@petfinder/petfinder-js");
const {
  errorHandler,
  sendData,
  notifyUser,
  omitNullValues,
  omitNullValuesObj,
  dbErrorHandler,
} = require("../_helper");

exports.createPet = async (req, res) => {
  try {
    let {
      tag,
      type,
      breed,
      gender,
      age,
      size,
      color,
      good_with_Children,
      about,
    } = req.body;
    let photos = req.files;
    let profile = `${process.env.CLIENT_URL}/profile/${tag}`;
    let newPet = {
      tag,
      type,
      breed,
      gender,
      age,
      size,
      color,
      good_with_Children,
      photos,
      profile,
      about,
    };
    let new_pet = new pet(newPet);

    new_pet
      .save()
      .then((data) => {
        console.log("new ", data.id);
        sendData({ status: "success", pet_id: data._id }, res);
      })
      .catch((err) => {
        // error code: 11000 is a duplicate key error collection
        let errMsg = dbErrorHandler(err);
        errorHandler(errMsg, res);
      });
  } catch (error) {}
};

exports.getPets = async (req, res) => {
  let { requirement, limit } = req.body;
  await pet
    .find({ ...requirement, adopted: false })
    .then((pet_localdatabase) => {
      console.log("pet_localdatabase", pet_localdatabase);
      const API_KEY = "4Nadt1xYLpbz7zUA7EZw912fOFZ2XjfixflAV5ZSsVyTJJHgmA";
      const API_SECRET = "UdK8HkuwngzBXCjb3ZCKPONggJfgZ8o7DgtrNN0Q";

      var client = new petfinder.Client({
        apiKey: API_KEY,
        secret: API_SECRET,
      });
      client.animal
        .search({ ...requirement })
        .then(function (response) {
          let pet_remotedatabase = response.data.animals;
          console.log("pet_remotedatabase ", pet_remotedatabase);
          // let temp = result_localdatabase.concat(response.data.animals);
          // sendData({ search: temp }, res);
          if (!(pet_localdatabase.length > limit)) {
            pet_remotedatabase.forEach((pet, i) => {
              if (pet_localdatabase.length < limit) {
                local.push(pet);
              }
            });
            sendData({ status:"success", search: pet_localdatabase }, res);
          } else {
            let ceil = Math.ceil(limit / 2);
            let floor = Math.floor(limit / 2);
            let tempLocal = [];
            let tempReomte = [];
            pet_localdatabase.forEach((pet, i) => {
              if (tempLocal.length < ceil) {
                tempLocal.push(pet);
              }
            });
            pet_remotedatabase.forEach((pet, i) => {
              if (tempReomte.length < floor) {
                tempReomte.push(pet);
              }
            });
            let conc_arr = tempLocal.concat(tempReomte);
            console.log("conc_arr: ", conc_arr)
            sendData({ status:"success", pets: conc_arr }, res);
          }
        })
        .catch(function (error) {
          // Handle the error
        });
    });
};

exports.adopt = async (req, res) => {
  try {
    let customer_id = req.profile.id;
    let pet_id = req.pet.id;

    let request = new adoptionRequest({ customer_id, pet_id });
    request
      .save()
      .then((data) => {
        console.log("new ", data.id);
        sendData(
          {
            status: "success",
            request: data._id,
            customer_id: data.customer_id,
            pet_id: data.pet_id,
          },
          res
        );
      })
      .catch((err) => {
        // error code: 11000 is a duplicate key error collection
        let errMsg = dbErrorHandler(err);
        errorHandler(errMsg, res);
      });
  } catch (error) {}
};
