const Sequelize = require("sequelize");
const sequelize = require("./Index");
const Bid = require("../models/Bid");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Model = Sequelize.Model;
class Product extends Model {

}
Product.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'products'
        // options
});

Product.Bids = Product.hasMany(Bid, {
    foreignKey: "product_id",
    onDelete: 'CASCADE'
});

module.exports = Product;