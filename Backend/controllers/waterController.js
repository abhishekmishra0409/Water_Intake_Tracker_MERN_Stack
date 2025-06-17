const mongoose = require('mongoose');
const WaterLog = require('../models/WaterLog');

exports.addWaterLog = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user._id;
        const log = new WaterLog({ userId, amount });
        await log.save();
        res.status(201).json({ success: true, log });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getTodayLog = async (req, res) => {
    try {
        const userId = req.user._id;
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const logs = await WaterLog.find({
            userId,
            date: { $gte: start, $lte: end },
        });

        const total = logs.reduce((acc, l) => acc + l.amount, 0);
        res.json({ logs, total });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        const logs = await WaterLog.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    total: { $sum: "$amount" },
                },
            },
            { $sort: { _id: -1 } },
        ]);

        res.json(logs);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};