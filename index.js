const Server = require("./startup/server");
const app = require("./startup/app");
const server = new Server(app);
server.start();