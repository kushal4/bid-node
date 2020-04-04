const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
module.exports = function(app) {
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json());
}