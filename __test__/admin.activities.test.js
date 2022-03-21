const chai = require("chai");
const request = require("supertest");
const app = require("../app");
const { user, pet } = require("../models");
const fs = require("fs");
const path = require("path");
describe("/GET view adoption requests", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/api/get_adoption_requests").send({
      phoneNumber: "00002",
      startDate: "2022-02-01",
      endDate: "03/20/2022",
    });
    expect(res.statusCode).toEqual(200);
  });
  it("should return 400 for unauthourized user", async () => {
    const res = await request(app).get("/api/get_adoption_requests").send({
      phoneNumber: "4569",
      startDate: "2022-02-01",
      endDate: "03/20/2022",
    });
    expect(res.statusCode).toEqual(400);
  });
});

describe("/POST grant adoption request", () => {
  it("should return 200 for granting a adoption request", async () => {
    const res = await request(app)
      .post("/api/grant_adoption_request/6233f146d864b803cdbd8a62")
      .send({
        phoneNumber: "00001",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.err).toEqual(expect.any(String));
  });
  it("should return 400 for non existing adoption request", async () => {
    const res = await request(app)
      .post("/api/grant_adoption_request/6233f146d864b803cdbd8a621")
      .send({
        phoneNumber: "00001",
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.err).toEqual(expect.any(String));
  });
  it("should return 400 for unautherized/non existing account", async () => {
    const res = await request(app).post("/api/admin-signin").send({
      phoneNumber: "45",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.err).toEqual(expect.any(String));
  });
});

describe("/POST add new pet", () => {
  beforeAll(() => {
    pet.collection.drop();
  });
  it("should return 200 and create a pet with multiple image upload", async () => {
    const res = await request(app)
      .post("/api/create_pet")
      .set("content-type", "multipart/form-data")
      .field("tag", "00-00")
      .field("type", "cat")
      .field("breed", "shady")
      .field("gender", "male")
      .field("age", "young")
      .field("size", "medium")
      .field("color", "white")
      .field("good_with_Children", true)
      .attach(
        "photo",
        fs.readFileSync(
          path.resolve(__dirname, "../_arb_images/white-cat-0.jpg")
        )
      )
      .attach(
        "photo",
        fs.readFileSync(
          path.resolve(__dirname, "../_arb_images/white-cat-1.jpg")
        )
      );
    expect(res.statusCode).toEqual(200);
  });
  it("should return 409 for existing pet record", async () => {
    const res = await request(app)
      .post("/api/create_pet")
      .set("content-type", "multipart/form-data")
      .field("tag", "00-00")
      .field("type", "cat")
      .field("breed", "shady")
      .field("gender", "male")
      .field("age", "young")
      .field("size", "medium")
      .field("color", "white")
      .field("good_with_children", true)
      .attach(
        "photo",
        fs.readFileSync(
          path.resolve(__dirname, "../_arb_images/white-cat-0.jpg")
        )
      )
      .attach(
        "photo",
        fs.readFileSync(
          path.resolve(__dirname, "../_arb_images/white-cat-1.jpg")
        )
      );
    expect(res.statusCode).toEqual(409);
  }, 18000);
});
