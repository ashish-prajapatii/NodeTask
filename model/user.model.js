const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },

    phoneno: {
        type: String,
    },

    password: {
        type: String,
    }
});

module.exports = mongoose.model("users", userSchema);