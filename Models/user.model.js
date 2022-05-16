const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: [true, "User must have an email"],
        unique: [true, "This email already exists, please login"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password cannot be less then 6 characters"],
    },
    firstLogin: {
        type: Boolean,
        default: true
    },
    token: { type: String }
});

module.exports = mongoose.model("User", UserSchema);