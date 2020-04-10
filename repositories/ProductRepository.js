const Product = require("../models/product");
const Bid = require("../models/bid");

class ProductRepository {

    async save(product_obj) {
        let product = await Product.create(product_obj);
        return product;
    }

    async bulkSave(productArr) {
        let products = await Product.bulkCreate(productArr);
        return products;
    }

    async remove(product_query = {}) {
        console.log("remove products");
        await Product.destroy({
            where: product_query
        });
    }

    async findAll() {
        let products = await Product.findAll({
            include: [{ model: Bid }]
        });
        return products;
    }
}

module.exports = ProductRepository;