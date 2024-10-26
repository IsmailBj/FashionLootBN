const BoxModel = require('../models/box.model');

exports.getAllBoxes = async (req, res, next) => {
    try {
        const boxes = await BoxModel.find();
        res.json({ boxes });
    } catch (error) {
        console.error('Error fetching boxes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.addNewBox = async (req, res, next) => {
    try {
        // const newBox = new BoxModel(req.body)
        // await newBox.save()
        console.log("suceess")
    } catch (error) {
        console.error('Error Posting box:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
