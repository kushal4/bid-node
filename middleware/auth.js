const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = function(req, res, next) {

    var i = 'Mysoft corp'; // Issuer 
    var s = 'some@user.com'; // Subject 
    var a = 'http://mysoftcorp.in'; // Audience
    var verifyOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: ["RS256"]
    };

    let token = req.header("Authorization").split(' ')[1];
    console.log("token::" + token);
    if (!token) return res.status(401).send({
        code: 401,
        message: "Access Denied Unauthenticated"
    });
    let publicKey = fs.readFileSync('./public.key', 'utf8');
    try {
        jwt.verify(token, publicKey, verifyOptions, function(err, payload) {

            /*
                err = {
                    name: 'TokenExpiredError',
                    message: 'jwt expired',
                    expiredAt: 1408621000
                }
            */
            if (err) {
                return res.status(401).json({
                    code: 401,
                    message: err.message
                });
            }
            req.user = payload;
            next();
        });

    } catch (ex) {
        res.status(401).json({
            code: 401,
            message: "Invalid token"
        });
    }


}