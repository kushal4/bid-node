//const Product = require("../models/product");
const Bid = require("../models/Bid");
const _ = require("lodash");
const { Op } = require("sequelize");
const { BidValidation } = require("../utils/bid_validation");

class BidController {

    async save(req, res, next) {
        const bid_obj = _.pick(req.body, ["user_id", "product_id", "price"]);
        //console.log(bid_obj);
        try {
            const { error } = BidValidation.validateBid(bid_obj);
            let response = {
                code: 200
            };
            if (error) {
                return {
                    code: 408,
                    errors: err_obj
                };
            }
            const create_obj = {
                ...bid_obj
            };
            //console.log(create_obj);
            const result = await Bid.create(create_obj);

            if (result) {

                //bids = bids.toJSON();
                //console.log(bids);
                let bids = await this._fetch(bid_obj);
                response["product_id"] = bid_obj["product_id"];
                response["bids"] = bids;
                return response;
            }
        } catch (ex) {
            next(ex);
        }


    }

    async _fetch(bid_obj) {
        console.log(bid_obj);
        let bids = await (Bid.findAll({
            where: {
                product_id: bid_obj["product_id"]
            }
        }));

        return bids;
    }

    async remove(req, res, next) {
        //  console.log("remove hit");
        const response = {
            code: 200
        };
        //console.log(req.params);
        const bid_id = req.params.bid_id;
        const product_id = req.params.product_id;
        //console.log(bid_id, product_id);
        //const bid_obj = _.pick(req.body, ["product_id", "bid_id"]);
        // console.log(bid_obj);
        try {
            let whereObj = {
                    id: bid_id,
                    product_id: product_id
                }
                //console.log(whereObj);
            const rowsDeleted = await Bid.destroy({
                where: whereObj
            });
            //console.log(rowsDeleted);
            if (rowsDeleted > 0) {
                let bids = await this._fetch(whereObj);
                response["bids"] = bids;
                //console.log(response);
                return response;
            } else {
                return {
                    code: 500,
                    message: "bid didn't get deleted for some internal reason"
                }
            }
        } catch (ex) {
            next(ex);
        }

    }

    async finalize(req, res, next) {
        const response = {
            code: 200
        };
        const bid_id = req.params.bid_id;
        const product_id = req.params.product_id;
        try {
            let whereObj = {
                id: {
                    [Op.ne]: bid_id
                },
                product_id: product_id
            }

            const rowsDeleted = await Bid.destroy({
                where: whereObj
            });
            //console.log(rowsDeleted);
            if (rowsDeleted > 0) {
                let update_result = await Bid.update({
                    is_finalized: true
                }, {
                    where: {
                        id: bid_id,
                        product_id: product_id
                    }
                });
                if (update_result.length > 0) {
                    let bids = await this._fetch(whereObj);
                    response["bids"] = bids;
                    //console.log(response)
                } else {
                    response["code"] = 500;
                    response["message"] = "update of finalize didnt happern";
                }
            } else {
                response["code"] = 500;
                response["message"] = "Offer didn't get finalize for internal errors"
            }

            return response;
        } catch (ex) {
            next(ex);
        }
    }
}

module.exports = BidController;