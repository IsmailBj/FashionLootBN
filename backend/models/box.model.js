const mongoose = require('mongoose');

const BoxSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tag: { type: String, required: true },
    price: { type: Number, required: true },
    items: { type: Array, required: true },
    about: { type: String, required: false },
    imgUrl: { type: String, required: true },
    rarity: { type: Number, require: true }
});

const BoxModel = mongoose.model('Boxes', BoxSchema);

module.exports = BoxModel;