const express = require('express')
const router = express.Router()

const BoxController = require('../controllers/BoxController')

router.get('/all', BoxController.getAllBoxes)

router.post('/add-box', BoxController.addNewBox)

router.put('/update', BoxController.updateBoxByTitle)

router.delete('/remove-box', BoxController.removeBox)

module.exports = router