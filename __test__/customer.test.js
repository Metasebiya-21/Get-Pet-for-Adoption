const req = require("express/lib/request");
const request = require("supertest");
const app = require("../app");
const { user, adoptionRequest } = require("../models");

describe("/POST register new customer", () => {
  beforeAll(() => {
    user.collection.drop();
  });
  it("should return 200 for new record", async () => {
    const res = await request(app).post("/api/add_customer").send({
      firstName: "SCM",
      lastName: "RCNDCC",
      gender: "Male",
      BoD: "04/24/1996",
      email: "metasebiya9@gmail.com",
      phoneNumber: "00005",
      password: "SCM3@dm!n",
    });
    // console.log(res.statusCode);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual(expect.any(String));
    expect(res.body.customer_id).toEqual(expect.any(String));
  });
  it("should return 409 for existing record", async () => {
    const res = await request(app).post("/api/add_customer").send({
      firstName: "SCM",
      lastName: "RCNDCC",
      gender: "Male",
      BoD: "24/04/1996",
      email: "metasebiya9@gmail.com",
      phoneNumber: "00005",
      password: "SCM3@dm!n",
    });
    // console.log(res.statusCode);
    expect(res.statusCode).toEqual(409);
    expect(res.body.customer_id).toEqual(expect.any(String));
  });
});

describe("/GET customer search pets", () => {
  describe("Customer search for pets based on some requirements and specified number", () => {
    it("should return 200", async () => {
      const res = await request(app)
        .get("/api/get_pets")
        .send(
          {
            limit: 2,
            requirement: {
              color: "white",
              type: "cat",
            },
          },
          18000
        );
      expect(res.statusCode).toEqual(200);
    });
  });
});

describe("create a new adoption request", () => {
  beforeAll(() => {
    adoptionRequest.collection.drop();
  });
  it("should return 200 for adoption request", async () => {
    const res = await request(app).post("/api/adopt/00-00").send({
      phoneNumber: "00005",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual(expect.any(String));
    expect(res.body.adoption_id).toEqual(expect.any(String));
  });
  it("should return 400 for adoption request for the same (identical) pet", async () => {
    const res = await request(app).post("/api/adopt/00-34").send({
      phoneNumber: "00005",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.err).toEqual(expect.any(String));
  });
  it("should return 400 for non existing user account", async () => {
    const res = await request(app).post("/api/adopt/00-00").send({
      phoneNumber: "450",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.err).toEqual(expect.any(String));
  });
});

describe("view a pet profile", () => {
  it("should return 200 for existing pet", async () => {
    const res = await request(app).get("/api/profile/00-00").send({
      phoneNumber: "45",
    });
    expect(res.statusCode).toEqual(200);
  });
  it("should return 200 for non existing pet", async () => {
    const res = await request(app).get("/api/profile/40-00").send({
      phoneNumber: "45",
    });
    expect(res.statusCode).toEqual(400);
  });
});
