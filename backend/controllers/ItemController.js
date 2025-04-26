const ItemModel = require('../models/item.model')


exports.getAllItems = async (_req, res) => {
    try {
        const items = await ItemModel.find();
        res.json({ items });
    } catch (error) {
        console.error('Error fetching boxes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addNewItem = async (req, res) => {
    try {
        const { name, id, price, imgUrl, AmountAvailable } = req.body

        if (!name || !id || !price || !imgUrl || !AmountAvailable) {
            return res.status(400).json({ error: "Missing required fields" })
        }
        const newItem = new ItemModel(req.body)
        await newItem.save()

        res.status(200).json({ message: "item created successfully ", item: newItem })

    } catch (error) {
        console.error('Error Posting Item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updateItemByName = async (req, res) => {
    try {
        const { name } = req.query
        const update = req.body

        const updatedItem = await ItemModel.findOneAndUpdate(
            { name: { $regex: name, $options: 'i' } },
            update,
            { new: true }
        )

        if (!updatedItem) {
            return res.status(404).json({ error: "Item not found" })
        }

        res.status(200).json({ message: "Item updated successfully", item: updatedItem })

    } catch (error) {
        console.error('Error Posting Item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.removeItem = async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.status(400).json({ error: "Missing item name" })
        }

        const deletedItem = await ItemModel.findByIdAndDelete({ name: { $regex: name, $options: 'i' } })

        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" })
        }

        res.status(200).json({ message: "Item removed successfully", deletedItem })

    } catch (error) {
        console.error('Error Posting Item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
