const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const verifyToken = require('../middleware/authMiddleware')

router.post('/register', UserController.registerUser)

router.post('/login', UserController.loginUser)

router.get('/user-data', verifyToken, UserController.getUserData)

router.get('/user-address', verifyToken, UserController.getAddressList)

router.post('/add-address', verifyToken, UserController.setNewAddress)

router.post('/buy-coints', verifyToken, UserController.getAmount)

router.get('/allUs', UserController.getAllUsers)

module.exports = router
