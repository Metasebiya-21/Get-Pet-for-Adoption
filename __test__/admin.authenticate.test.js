const req = require("express/lib/request");
const request = require("supertest");
const app = require("../app");
const { user } = require("../models");

describe("/POST admin signIn", () => {
  it("should return 200 for successfull login", async () => {
    const res = await request(app).post("/api/admin-signin").send({
      email: "metasebiya8@gmail.com",
      password: "SCM3@dm!n",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual(expect.any(String));
    expect(res.body.adminId).toEqual(expect.any(String));
  });
  it("should return 400 for username/password mismatch", async () => {
    const res = await request(app).post("/api/admin-signin").send({
      email: "metasebiya8@gmail.com",
      password: "21039dj",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.err).toEqual(expect.any(String));
  });
  it("should return 400 for non existing account", async () => {
    const res = await request(app).post("/api/admin-signin").send({
      email: "amanuel21@gmail.com",
      password: "SCM3@dm!n",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.err).toEqual(expect.any(String));
  });
});
