const express = require('express')
const router = express.Router()

const ItemController = require('../controllers/ItemController')

router.get('/all', ItemController.getAllItems)

router.post('/add-item', ItemController.addNewItem)

router.put('/update', ItemController.updateItemByName)

router.delete('/remove-item', ItemController.removeItem)

module.exports = router