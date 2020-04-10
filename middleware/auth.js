const fs = require("fs");
const JwtWrapper = require("../utils/JwtWrapper");

module.exports = function(req, res, next) {

    if (req.header("Authorization")) {
        let token = req.header("Authorization").split(' ')[1];
        //console.log("token::" + token);
        if (!token) return res.status(405).send({
            code: 405,
            message: "Access Denied Unauthenticated"
        });
        let publicKey = fs.readFileSync('./public.key', 'utf8');
        try {
            jwt_obj = new JwtWrapper(null);
            jwt_obj.verifyToken(token, function(err, payload) {

                /*
                    err = {
                        name: 'TokenExpiredError',
                        message: 'jwt expired',
                        expiredAt: 1408621000
                    }
                */
                if (err) {
                    console.log(err);
                    return res.status(402).json({
                        code: 401,
                        message: err.message
                    });
                }
                req.user = payload;
                next();
            });

        } catch (ex) {
            console.error(ex);
            res.status(404).json({
                code: 404,
                message: "Invalid token"
            });
        }
    } else {
        res.status(403).json({
            code: 403,
            message: "Not allowed to do this operation"
        });
    }




};