const Sequelize = require("sequelize");
const sequelize = require("./index");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Role = require("./role");

const Model = Sequelize.Model;
class User extends Model {
    generateToken() {
        let privateKEY = fs.readFileSync('./private.key', 'utf8');

        let token = jwt.sign({ role: this.role, user_id: this.id, username: this.username }, privateKEY);
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