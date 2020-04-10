const JwtWrapper = require("../../../utils/JwtWrapper");
describe("token", () => {

    it("generates and verifies token", async() => {
        let payload = {
            id: 2,
            username: "kushal",
            role: "trader"
        };
        let token_obj = new JwtWrapper(payload);
        let token = token_obj.generateToken();
        token_obj.verifyToken(token, (err, decoded) => {
            console.log(decoded)
            expect(decoded).toMatchObject(payload);
        });

    });
});