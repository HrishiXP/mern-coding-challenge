const express = require('express');
const { getTransactions, seedDatabase } = require('../controllers/transactionController');
const { getStatistics } = require('../controllers/statisticsController');
const { getPriceRangeData } = require('../controllers/barChartController');
const { getCategoryData } = require('../controllers/pieChartController');

const router = express.Router();

// Seed the database with the data from third-party API
router.get('/seed', seedDatabase);

// List transactions with search and pagination
router.get('/', getTransactions);

// Combined data from all APIs
router.get('/combined', async (req, res) => {
    try {
        const [transactions, statistics, barChartData, pieChartData] = await Promise.all([
            getTransactions(req, res),
            getStatistics(req, res),
            getPriceRangeData(req, res),
            getCategoryData(req, res)
        ]);

        res.json({ transactions, statistics, barChartData, pieChartData });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch combined data" });
    }
});

module.exports = router;
