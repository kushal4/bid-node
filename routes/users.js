const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");

let controller = new UserController();



router.post("/login", async(req, res) => {


    const user = await controller.login(req, res);
    // if (user["code"] != 200) {
    //     res.status(400);
    // }
    //return JSON.stringify();
    res.send(user);
});


module.exports = router;