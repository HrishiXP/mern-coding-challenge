const Transaction = require('../models/Transaction');
const axios = require('axios');

// Fetch and seed database from third-party API
exports.seedDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany();  // Clear old data
        await Transaction.insertMany(response.data);  // Insert new data
        res.status(200).json({ message: "Database seeded successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to seed database" });
    }
};

// Fetch transactions with pagination and search
exports.getTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;
    const regex = new RegExp(search, 'i');
    const filter = { $or: [{ title: regex }, { description: regex }, { price: regex }] };

    if (month) {
        filter.dateOfSale = { $regex: `-${month.padStart(2, '0')}-` };
    }

    const transactions = await Transaction.find(filter)
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage));

    res.json(transactions);
};
