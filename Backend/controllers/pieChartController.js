exports.getCategoryData = async (req, res) => {
    const { month } = req.query;
    const regex = new RegExp(`-${month.padStart(2, '0')}-`);

    const categories = await Transaction.aggregate([
        { $match: { dateOfSale: { $regex: regex } } },
        { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.json(categories);
};
