const mongoose = require("mongoose");

const waterLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: Number, // in ml
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WaterLog", waterLogSchema);
