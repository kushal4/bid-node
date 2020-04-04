const Sequelize = require("sequelize");
const sequelize = require("./index");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Role = require("./role");

const Model = Sequelize.Model;
class User extends Model {
    generateToken() {
        let privateKEY = fs.readFileSync('./private.key', 'utf8');
        console.log(privateKEY);
        var i = 'Mysoft corp'; // Issuer 
        var s = 'some@user.com'; // Subject 
        var a = 'http://mysoftcorp.in'; // Audience
        // SIGNING OPTIONS
        let signOptions = {
            issuer: i,
            subject: s,
            audience: a,
            expiresIn: "12h",
            algorithm: "RS256"
        };

        let payload = { role: this.role, user_id: this.id, username: this.username }

        let token = jwt.sign(payload, privateKEY, signOptions);
        return token;
    }
}
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'users'
        // options
});

User.hasOne(Role, {
    foreignKey: "user_id"
});

module.exports = User;