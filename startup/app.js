const express = require('express');
const app = express();
//const http = require('http').Server(app);

require("./middleware")(app);
require("./routes")(app);
require("./error_handler")(app);
module.exports = app;