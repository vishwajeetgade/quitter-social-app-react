const db = require('../models/index');

exports.createMessage = async function (req, res, next) {
    try {
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        })
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message.id).populate('user', {
            username: true,
            profileImgUrl: true
        })
        return res.status(200).json(foundMessage);
    } catch (error) {
        return next(error);
    }
}
exports.getMessage = async function (req, res, next) {
    try {
        let message = await db.Message.findById(req.params.message_id);
        return res.status(200).json(message);
    } catch (error) {
        return next(error);
    }
}
exports.deleteMessage = async function (req, res, next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch (error) {
        return next(error);
    }
}