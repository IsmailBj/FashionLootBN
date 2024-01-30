const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const verifyToken = require('../middleware/authMiddleware')

router.post('/register', UserController.registerUser)

router.post('/login', UserController.loginUser)

router.post('/logout')

router.post('/resetpassword')

router.get('/user-data', verifyToken, UserController.getUserData) // fix this

router.get('/get-amount', verifyToken, UserController.getAmount) // fix this

module.exports = router
