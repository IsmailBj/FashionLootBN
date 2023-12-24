const express = require('express')
const router = express.Router()

const BoxController = require('../controllers/BoxController')
// http://localhost:3000/api/boxes/all
router.get('/all', BoxController.getAllBoxes)

router.get('/new')

router.get('/hot')

module.exports = router