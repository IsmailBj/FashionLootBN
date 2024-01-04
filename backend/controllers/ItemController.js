const Item = require('../models/item')

exports.getAllItems = (req, res, next) => {
    Item.findAll()
        .then(item => {
            res.json({ item })
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        })
}

