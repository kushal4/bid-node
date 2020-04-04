const User = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User_Validation } = require("../utils/user_validation");
const { getErrorObj } = require("../utils/custom_err_manip");
const Role = require("../models/role");
class UserController {





    async login(req, res) {
        let { error } = User_Validation.validateLogin(req.body);
        if (error) {
            let err_obj = getErrorObj(error);

            return {
                code: 407,
                errors: err_obj
            };
        }
        let credentials = _.pick(req.body, ["username", "password"]);
        let user_obj = await User.findOne({
            where: {
                username: credentials["username"]
            },
            include: Role
        });
        let user_pwd_errObj = {
            "code": 400,
            "errors": {

            }
        }
        let user = "";
        if (user_obj) {
            user = user_obj.toJSON();
        } else {
            user_pwd_errObj["errors"]["username"] = "No valid user found"
            return user_pwd_errObj;
        }
        console.log(user["role"]);
        user_obj.role = user["role"]["role"];
        //console.log(login_response);
        let inp_password = credentials["password"];
        //console.log(credentials);
        //console.log(user);
        //let isValidPassword = await bcrypt.compare(inp_password, user["password"]);
        let isValidPassword = (inp_password === user["password"]);
        console.log(isValidPassword);
        if (!isValidPassword) {
            user_pwd_errObj["errors"]["password"] = "Password didnt match"
            return user_pwd_errObj;
        }
        user = _.pick(user, ["username"]);
        user["code"] = 200;
        user["access_token"] = user_obj.generateToken();
        return user;
    }
}

module.exports = UserController;