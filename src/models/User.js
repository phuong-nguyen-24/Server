const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    username: String,
    hash: String,
    role: {
        type: String,
        default: "User"
    } 
})
    const User = mongoose.model("User", userSchema);

module.exports = User;