const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.post('/register', UserController.registerUser)

router.post('/login', UserController.loginUser)

router.post('/logout')

router.post('/resetpassword')

module.exports = router