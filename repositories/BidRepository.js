const Bid = require("../models/Bid");

class BidRepository {

    constructor() {

    }

    async save(bid_obj) {
        let bid = await Bid.create(bid_obj);
        return bid;
    }

    async bulkSave(bid_arr) {
        let bids = await Bid.bulkCreate(bid_arr);
        bids = JSON.parse(JSON.stringify(bids));
        return bids;
    }

    async remove(bid_obj = {}) {
        let rowsDeleted = await Bid.destroy({
            where: bid_obj
        });
        return rowsDeleted;
    }

    async findAll(bid_query = {}) {
        let bids = await (Bid.findAll({
            where: bid_query
        }));

        return bids;
    }

    async update(updateQuery, whereQuery) {
        let update_result = await Bid.update(updateQuery, {
            where: whereQuery
        });

        return update_result;
    }
}

module.exports = BidRepository;