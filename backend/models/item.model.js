const mongodb = require('mongodb')
const getDb = require('../utils/database').getDb

class Item {
    constructor(id, name, price, img) {
        this.id = id,
            this.name = name,
            this.price = price,
            this.img = img
    }

    static findAll() {
        const db = getDb()
        return db.collection('items').find().toArray()
    }
}

module.exports = Item
