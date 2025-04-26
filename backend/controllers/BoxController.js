const BoxModel = require('../models/box.model');

exports.getAllBoxes = async (_req, res, next) => {
    try {
        const boxes = await BoxModel.find();
        res.json({ boxes });
        next()
    } catch (error) {
        console.error('Error fetching boxes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.addNewBox = async (req, res) => {
    try {
        const { title, tag, price, items, imgUrl, rarity } = req.body;

        if (!title || !tag || !price || !items || !imgUrl || rarity === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newBox = new BoxModel(req.body);
        await newBox.save();

        res.status(201).json({ message: 'Box created successfully', box: newBox });

    } catch (error) {
        console.error('Error Posting box:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.updateBoxByTitle = async (req, res) => {
    try {
        const { title } = req.query
        const updates = req.body

        const updatedBox = await BoxModel.findOneAndUpdate(
            { title: { $regex: title, $options: 'i' } },
            updates,
            { new: true }
        )

        if (!updatedBox) {
            return res.status(404).json({ error: "Box not found" })
        }

        res.status(200).json({ message: "Box updated successfully", box: updatedBox })

    } catch (error) {
        console.error('Error Posting box:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.removeBox = async (req, res) => {
    try {
        const { title } = req.query

        if (!title) {
            return res.status(400).json({ error: "Missing box title" })
        }

        const deletedBox = await BoxModel.findOneAndDelete({ title: { $regex: title, $options: 'i' } })

        if (!deletedBox) {
            return res.status(404).json({ error: "Box not found" })
        }

        res.status(200).json({ message: "Box removed succesfully", deletedBox })

    } catch (error) {
        console.error("Error removing box: ", error)
        res.status(500).json({ error: 'Internal server Error' })

    }

}