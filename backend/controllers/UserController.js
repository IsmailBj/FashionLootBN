const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.registerUser = async (req, res, next) => {
    try {
        const userData = req.body;

        const existingUser = await UserModel.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const newUser = new UserModel({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            gender: userData.gender
        });

        await newUser.save();
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


exports.loginUser = async (req, res, next) => {
    try {
        const { email, pass } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(pass);

        if (!isPasswordValid) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, message: 'Login successful', token, expiresIn: 3600 });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getUserData = async (req, res, next) => {
    try {
        const email = req.user.email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user: { isUserLogin: true, username: user.username, email: user.email, wallet: { amount: user.amount, currency: user.currency } } })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error getUserData' });
    }
}
// not tested
exports.getAmount = async (req, res, next) => {
    try {
        const email = req.user.email;
        const resUser = await UserModel.getAmount(email)
        res.json({ success: true, wallet: { amount: resUser.amount, currency: resUser.currency } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error getAmount' });
    }
}
