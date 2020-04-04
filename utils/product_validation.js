const Joi = require('@hapi/joi');


class ProductValidation {

    static validateProduct(product) {
        const productValidation = Joi.object({
            name: Joi.string()
        })

        return productValidation.validate(product, { abortEarly: false });
    }
}


module.exports.ProductValidation = ProductValidation;