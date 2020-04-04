const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/ProductController");

const controller = new ProductController;

router.get("/", async(req, res, next) => {
    let product_response = await controller.retrieve(req, res, next);
    res.send(product_response);
});

router.post("/", async(req, res, next) => {
    let product_response = await controller.save(req, res, next);
    res.send(product_response);
});

router.delete("/:product_id", async(req, res, next) => {
    let product_response = await controller.remove(req, res, next);
    res.send(product_response);
});

module.exports = router;