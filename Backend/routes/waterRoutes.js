const express = require('express');
const router = express.Router();
const {
    addWaterLog,
    getTodayLog,
    getHistory,
} = require('../controllers/waterController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addWaterLog);
router.get('/today', authMiddleware, getTodayLog);
router.get('/history', authMiddleware, getHistory);

module.exports = router;