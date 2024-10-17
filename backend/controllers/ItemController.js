const ItemModel = require('../models/item.model')


exports.getAllItems = async (req, res, next) => {
    try {
        const items = await ItemModel.find();
        res.json({ items });
    } catch (error) {
        console.error('Error fetching boxes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
