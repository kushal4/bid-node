const server_conf = require("../config/server_conf");

class Server {

    constructor(app) {
        let { port } = server_conf;
        this.port = port;
        this.app = app;
    }
    start() {
        this.port = this.port || 3003;
        this.app.listen(this.port, () => console.log(`Listening on port ${this.port}...`));
    }

}

module.exports = Server;