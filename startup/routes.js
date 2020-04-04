const users = require("../routes/users");
const products = require("../routes/products");
const bids = require("../routes/bids");
module.exports = function(app) {
    app.use("/api/users", users);
    app.use("/api/products", products);
    app.use("/api/bids", bids);
}