const UserRepository = require("../repositories/UserRepository");
const JWtWrapper = require("../utils/JwtWrapper");
const _ = require("lodash");
const { User_Validation } = require("../utils/user_validation");
const { getErrorObj } = require("../utils/custom_err_manip");
class UserController {

    constructor() {
        this.status = 200;
    }
    async login(req, res) {
        let userRepo = new UserRepository();
        let { error } = User_Validation.validateLogin(req.body);
        if (error) {
            let err_obj = getErrorObj(error);


            return {
                code: 407,
                errors: err_obj
            };
        }
        let credentials = _.pick(req.body, ["username", "password"]);

        let user_pwd_errObj = {
            "code": 400,
            "errors": {}
        };
        let user_query = {
            username: credentials.username
        };
        // let user_obj = await User.findOne({
        //     where: {
        //         username: credentials.username
        //     },
        //     include: Role
        // });
        let user_obj = await userRepo.find(user_query);
        let user = "";
        if (user_obj) {
            user = user_obj.toJSON();
        } else {
            this.status = 400;
            user_pwd_errObj.errors.username = "No valid user found";
            return user_pwd_errObj;
        }
        //console.log(user["role"]);
        //user_obj.role = user.role.role;
        //console.log(login_response);
        let inp_password = credentials.password;
        //console.log(credentials);
        //console.log(user);
        //let isValidPassword = await bcrypt.compare(inp_password, user["password"]);
        let isValidPassword = (inp_password === user.password);
        console.log(isValidPassword);
        if (!isValidPassword) {
            this.status = 400;
            user_pwd_errObj.errors.password = "Password didnt match";
            return user_pwd_errObj;
        }
        user = _.pick(user, ["username"]);
        user.code = 200;
        user.access_token = userRepo.generateToken();
        return user;
    }

    getStatus() {
        return this.status;
    }
}

module.exports = UserController;