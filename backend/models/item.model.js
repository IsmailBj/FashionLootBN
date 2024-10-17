const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String, required: true },
    AmountAvailable: { type: Number, require: true },
})

const ItemModel = mongoose.model('items', ItemSchema)

module.exports = ItemModel