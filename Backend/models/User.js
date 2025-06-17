const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dailyGoal: { type: Number, default: 2000 }, // in ml
});

module.exports = mongoose.model("User", userSchema);
