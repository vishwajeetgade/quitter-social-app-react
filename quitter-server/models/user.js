const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImgUrl: {
        type: String
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});


// Encrypting Password -----
//per method to which encode the password in hash before saving then in database
userSchema.pre('save', async function (next) {
    try {
        // if password is not modified then just return next() -> save
        if (!this.isModified("password")) return next();
        // hashing the password using some salt
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        //return err from handler/error.js -> errorHandler
        return next(err);
    }
});

//compare store password with the user login password candidatePassword
userSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        //return err from handler/error.js -> errorHandler
        return next(err);
    }
};
// Encrypting Password ------

const User = mongoose.model("User", userSchema);

module.exports = User;