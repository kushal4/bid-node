const Product = require("../models/product");
const Bid = require("../models/Bid");
const _ = require("lodash");
const { ProductValidation } = require("../utils/product_validation");
const { getErrorObj } = require("../utils/custom_err_manip");

class ProductController {

    async save(req, res, next) {
        let response = {
            code: 200
        };
        let product_obj = _.pick(req.body, ["name"]);
        console.log(product_obj);
        try {
            let { error } = ProductValidation.validateProduct(product_obj);
            //console.log(error)
            if (error) {
                let err_obj = getErrorObj(product_err);
                return {
                    code: 408,
                    errors: err_obj
                };
            }
            let result = await Product.create({
                name: product_obj["name"]
            });
            if (result) {
                //console.log(result);
                //console.log(result.toJSON());
                let products = await this._fetch();
                console.log(products);
                response["products"] = products;
            } else {
                response["code"] = 500;
                response["message"] = "something went wrong ...";
            }

            return response;
        } catch (ex) {
            next(ex);
        }

    }

    async _fetch() {

        let product_bids = await Product.findAll({
            include: [{ model: Bid }]
        });
        // console.log(productP.toString());
        // let products = productP.map(product => {
        //     // console.log(product);
        //     //delete product["bids"]["product_id"];
        //     return product;
        // });
        //console.log(products);
        return product_bids
    }

    async retrieve(req, res, next) {
        let response = {
            code: 200
        };

        try {
            response["products"] = await this._fetch();
            return response;
        } catch (ex) {
            next(ex);
        }

    }

    async remove(req, res, next) {
        let response = {
            code: 200
        };

        // 1)fetch product_id from params
        // 2) perform delete  query on that product_id
        // 3) if this returns postive rowCount then return list of remaining products else return error

        const product_id = req.params.product_id;
        try {
            const deletedRows = await Product.destroy({
                where: {
                    id: product_id
                },
                include: [{ model: Bid }]
            });
            if (deletedRows > 0) {
                response["products"] = await this._fetch();
                return response;
            } else {
                response["code"] = 500;
                response["message"] = "Something went wrong ...";
            }
        } catch (ex) {
            next(ex);
        }

    }
}

module.exports = ProductController;