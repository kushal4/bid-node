const fs = require("fs");
const jwt = require("jsonwebtoken");
class JwtWrapper {

    constructor(payload) {
        this.payload = payload;
        var i = 'Mysoft corp'; // Issuer 
        var s = 'some@user.com'; // Subject 
        var a = 'http://mysoftcorp.in'; // Audience
        this.siGnVerifyopt = {
            "issuer": i,
            "subject": s,
            "audience": a,
            "expiresIn": "12h",
            "algorithm": "RS256"
        };
    }

    generateToken() {
        let privateKEY = fs.readFileSync('./private.key', 'utf8');
        // console.log(privateKEY);

        // SIGNING OPTIONS
        let token = jwt.sign(this.payload, privateKEY, this.siGnVerifyopt);
        return token;
    }

    verifyToken(token, callback) {
        let publicKey = fs.readFileSync('./public.key', 'utf8');
        jwt.verify(token, publicKey, this.siGnVerifyopt, function(err, payload) {
            callback(err, payload);
        });
        // console.log(decoded);
    }

}

module.exports = JwtWrapper;