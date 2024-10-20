const Transaction = require('../models/Transaction');

exports.getStatistics = async (req, res) => {
    const { month } = req.query;
    const regex = new RegExp(`-${month.padStart(2, '0')}-`);

    const totalSales = await Transaction.aggregate([
        { $match: { dateOfSale: { $regex: regex }, sold: true } },
        { $group: { _id: null, totalAmount: { $sum: "$price" } } }
    ]);

    const soldCount = await Transaction.countDocuments({ sold: true, dateOfSale: { $regex: regex } });
    const notSoldCount = await Transaction.countDocuments({ sold: false, dateOfSale: { $regex: regex } });

    res.json({
        totalAmount: totalSales[0]?.totalAmount || 0,
        soldCount,
        notSoldCount
    });
};
