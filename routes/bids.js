const express = require('express');
const router = express.Router();
const BidController = require("../controllers/BidController");
const auth = require("../middleware/auth");
const controller = new BidController();
router.post("/", auth, async(req, res, next) => {
    let bid_response = await controller.save(req, res, next);
    res.send(bid_response);
});

router.put("/:product_id/:bid_id", auth, async(req, res, next) => {
    console.log("put resource hit");
    let bid_response = await controller.finalize(req, res, next);
    res.send(bid_response);
})

router.delete("/:product_id/:bid_id", auth, async(req, res, next) => {
    let bid_response = await controller.remove(req, res, next);
    res.send(bid_response);
});

module.exports = router;