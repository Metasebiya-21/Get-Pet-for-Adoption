const req = require("express/lib/request");
const request = require("supertest");
const app = require("../app");
const { user } = require("../models");

describe("/POST register new admin", () => {
  beforeAll(() => {
    user.collection.drop();
  });
  it("should return 200 for new record", async () => {
    const res = await request(app).post("/api/admin-signup").send({
      firstName: "SCM",
      lastName: "RCNDCC",
      gender: "Male",
      BoD: "24/04/1996",
      email: "metasebiya8@gmail.com",
      phoneNumber: "00002",
      password: "SCM3@dm!n",
    });
    // console.log(res.statusCode)
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(expect.any(String))
  });

  it("should return 409 for existing record", async () => {
    const res = await request(app).post("/api/admin-signup").send({
      firstName: "SCM",
      lastName: "RCNDCC",
      gender: "Male",
      BoD: "24/04/1996",
      email: "metasebiya8@gmail.com",
      phoneNumber: "00002",
      password: "SCM3@dm!n",
    });
    // console.log(res.statusCode);
    expect(res.statusCode).toEqual(409);
    expect(res.body.err).toEqual(expect.any(String));
  });
});
