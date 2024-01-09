const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://LootMan:l15zjuzMxXNOIIzU@clusterloot.kcvmtlr.mongodb.net/ProductsBox?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, poolSize: 10, })
        .then(client => {
            console.log('connected')
            _db = client.db()
            callback()
        }).catch(err => {
            console.log('connection faild ', err)
            throw err
        })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw 'No Database Found!'
}

const close = () => {
    if (_db) {
        _db.close();
        console.log('Connection to MongoDB closed');
    }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.close = close;
