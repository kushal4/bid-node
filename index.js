const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require("./startup/middleware")(app);
require("./startup/routes")(app);
require("./startup/error_handler")(app);
const port = process.env.PORT || 3003;
http.listen(4444);
app.listen(port, () => console.log(`Listening on port ${port}...`));