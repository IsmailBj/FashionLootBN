const Box = require('../models/box')

exports.getAllBoxes = (req, res, next) => {
    Box.findAll()
        .then(boxes => {
            console.log(boxes)
            res.json({ boxes })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}


// todo test the api 