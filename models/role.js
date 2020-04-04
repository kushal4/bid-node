const Sequelize = require("sequelize");
const sequelize = require("./index");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Model = Sequelize.Model;
class Role extends Model {
   
}
Role.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM,
        allowNull: false,
        values:["Admin","Trader"]
}
}, {
    timestamps: false,
    sequelize,
    modelName: 'roles'
        // options
});

module.exports = Role;