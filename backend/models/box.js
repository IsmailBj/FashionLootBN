const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class Box {
    constructor(boxName, id, price, items = []) {
        this.boxName = boxName;
        this.id = id;
        this.price = price;
        this.items = items;
    }

    save() {
        const db = getDb();
        return db.collection('boxes').insertOne(this);
    }

    static findById(boxId) {
        const db = getDb();
        return db.collection('boxes').findOne({ _id: new mongodb.ObjectID(boxId) });
    }

    static findAll() {
        const db = getDb();
        return db.collection('Boxes').find().toArray();
    }
}

module.exports = Box;
