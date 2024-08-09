const ItemModel = require('../models/item.model')


exports.getAllItems = async (req, res, next) => {
    try {
        const item = await ItemModel.find();
        res.json({ item });
    } catch (error) {
        console.error('Error fetching boxes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
