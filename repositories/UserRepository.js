const User = require("../models/user");
const Role = require("../models/role");
const JWtWrapper = require("../utils/JwtWrapper");
class UserRepository {
    constructor() {
        this.user = {};
        this.jwt_obj = null;
    }
    async find(user_query) {
        this.user = await User.findOne({
            where: user_query,
            include: Role
        });
        let payload = this.jwt_payload();
        this.jwt_obj = new JWtWrapper(payload);
        return this.user;
    }

    jwt_payload() {
        let payload = { role: this.user.role, user_id: this.user.id, username: this.user.username };
        return payload;
    }

    generateToken() {
        let token = this.jwt_obj.generateToken();
        return token;
    }


}

module.exports = UserRepository;