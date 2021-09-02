const db = require('../models/index');
const jwt = require('jsonwebtoken');

exports.signin = async function (req, res, next) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        })
        let { id, username, profileImgUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImgUrl
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImgUrl,
                token
            })
        } else {
            return next({
                status: 400,
                message: "Invalid email and password"
            })
        }

    } catch (error) {
        return next({
            status: 400,
            message: "Invalid email and password"
        })
    }
}

exports.signup = async function (req, res, next) {
    try {
        //create a user
        let user = await db.User.create(req.body);
        // destructing user object
        let { id, username, profileImgUrl } = user;
        //create a token (signing token) using jsonwebtoken
        let token = jwt.sign(
            //payload
            {
                id,
                username,
                profileImgUrl
            },
            //signature
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImgUrl,
            token
        });
    } catch (error) {
        //if validation fails 
        if (error.code === 11000) {
            error.message = "Sorry, the username and/or email is taken";
        }
        return next({
            status: 400,
            message: error.message
        })
    }
}