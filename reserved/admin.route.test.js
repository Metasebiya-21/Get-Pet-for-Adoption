const request = require("supertest");
const app = require("../app");
describe("Admin Routes", () => {
  describe("Admin SignUp", () => {
    //admin exists
    describe("Admin Exists checkby phone", () => {
      it("should return 409 during signUp for existing user/admin", async () => {
        const res = await request(app).post("/api/admin-signup").send({
          firstName: "SCM",
          lastName: "RCNDCC",
          gender: "Male",
          BoD: "24/04/1996",
          email: "metasebiya8@gmail.com",
          phoneNumber: "00000",
          password: "SCM3@dm!n",
        });
        expect(res.statusCode).toEqual(409);
        // expect(res.body).toHaveProperty("post");
      });
    });
    //should return 400 for duplicate feilds
    describe("unique value: Admin Exists admin", () => {
      it("should return 409 during signUp for existing field: i.e: email", async () => {
        const res = await request(app).post("/api/admin-signup").send({
          firstName: "SCM",
          lastName: "RCNDCC",
          gender: "Male",
          BoD: "24/04/1996",
          email: "metasebiya8@gmail.com",
          phoneNumber: "00001",
          password: "SCM3@dm!n",
        });
        expect(res.statusCode).toEqual(409);
        // expect(res.body).toHaveProperty("post");
      });
    });
    //should return 200 for new entry
    describe("register new admin", () => {
      it("it should return 200 for new entry", async () => {
        const res = await request(app).post("/api/admin-signup").send({
          firstName: "SCM",
          lastName: "RCNDCC",
          gender: "Male",
          BoD: "24/04/1996",
          email: "metasebiya2@gmail.com",
          phoneNumber: "00002",
          password: "SCM3@dm!n",
        });
        console.log(res.statusCode)
        expect(res.statusCode).toEqual(200);
      });
    });
  });
  describe("Admin signUp", () => {
    //admin deosn't exist
    describe("admin does not exist", () => {
      it("should return 400 for non existing admin", async () => {
        res =  await request(app).post("/api/admin-signin").send({
          input: "metasebiya@gmail.com",
          password: "SCM3@dm!n",
        })
         expect(res.statusCode).toEqual(400);
      });
    });
  });
});
