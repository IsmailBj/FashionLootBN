const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const verifyToken = require('../middleware/authMiddleware')

router.post('/register', UserController.registerUser)

router.post('/login', UserController.loginUser)

router.post('/logout')

router.post('/resetpassword')

router.get('/user-data', verifyToken, UserController.getUserData)

router.post('/address', verifyToken, UserController.setUserAddress) // fix this

router.post('/buy-coints', verifyToken, UserController.getAmount)

module.exports = router
