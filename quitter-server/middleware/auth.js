// require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.loginRequired = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please Login first"
                });
            }
        });
    } catch (error) {
        return next({
            status: 401,
            message: "Please Login first"
        });
    }
}


// check whether user have authorization to create a message
exports.ensureCorrectUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            //verify the decoded tokens user id equal to login user
            if (decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorize"
                });
            }
        })
    } catch (error) {
        return next({
            status: 401,
            message: "Unauthorize"
        });
    }
}