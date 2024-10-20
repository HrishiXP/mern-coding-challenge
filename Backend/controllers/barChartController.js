const Transaction = require('../models/Transaction');

exports.getPriceRangeData = async (req, res) => {
    const { month } = req.query;
    const regex = new RegExp(`-${month.padStart(2, '0')}-`);

    const ranges = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    const counts = await Transaction.aggregate([
        { $match: { dateOfSale: { $regex: regex } } },
        { $bucket: {
            groupBy: "$price",
            boundaries: ranges,
            default: "901-above",
            output: { count: { $sum: 1 } }
        }}
    ]);

    res.json(counts);
};
