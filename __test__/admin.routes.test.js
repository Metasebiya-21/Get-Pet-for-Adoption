const request = require("supertest");
const app = require("../app");
describe("Admin Routes", () => {
  describe("Admin SignUp", () => {
    //add users

    describe("Admin Adds New Customer", () => {
      it("should return 200 for newly created user", async () => {
        const res = await request(app).post("/api/add_customer").send({
          firstName: "customer-1",

          lastName: "buchi",

          gender: "Male",

          BoD: "04/24/1996",

          email: "metasebiya16@gmail.com",

          phoneNumber: "0912300014",

          password: "SCM3@dm!n",
        });

        expect(res.statusCode).toEqual(200);
        // expect(res.body).toHaveProperty("post");
        
      });
    });
  });
});
