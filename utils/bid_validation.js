const Joi = require('@hapi/joi');
class BidValidation {

    static validateBid(bid) {
        const bidValidation = Joi.object({
            user_id: Joi.number(),
            product_id: Joi.number(),
            price: Joi.number()
        })

        return bidValidation.validate(bid, { abortEarly: false });
    }
}


module.exports.BidValidation = BidValidation;