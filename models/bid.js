const Sequelize = require("sequelize");
const sequelize = require("./index");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Model = Sequelize.Model;
class Bid extends Model {

}
Bid.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    is_finalized: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }

}, {
    timestamps: false,
    sequelize,
    modelName: 'bid'
        // options
});

module.exports = Bid;