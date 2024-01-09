const Box = require('../models/box.model')

exports.getAllBoxes = (req, res, next) => {
    Box.findAll()
        .then(boxes => {
            res.json({ boxes })
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
}
