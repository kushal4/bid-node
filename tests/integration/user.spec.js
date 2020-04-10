const app = require("../../startup/app");
const request = require('supertest');
beforeEach(() => {});
describe("user login", () => {
    it("can validate login user", async() => {
        let user = {
            "username": "mosh23",
            "password": "1234"
        };
        const res = await request(app)
            .post("/api/users/login")
            .send(user);

        expect(res.status).toBe(200);

    });
});