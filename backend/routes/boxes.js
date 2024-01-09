const express = require('express')
const router = express.Router()

const BoxController = require('../controllers/BoxController')

router.get('/all', BoxController.getAllBoxes)

router.get('/new')

router.get('/hot')

module.exports = router