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
        res.json({ success: true, message: 'Login successful', token });
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
        res.json({ success: true, user: { isUserLogin: true, username: user.username, email: user.email, wallet: { amount: user.amount, pending: user.amount } } })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error getUserData' });
    }
}

exports.setUserAddress = async (req, res, next) => {
    try {
        const email = req.user.email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const userData = req.body

        const userAddress = new UserModel({
            country: userData.country,
            city: userData.city,
            street: userData.street,
            streetNumber: userData.streetNumber,
            postCode: userData.postCode
        });

        await userAddress.save();
        res.json({ success: true, message: "address updated" })
        // TODO test this api 
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error setUserAddress' });
    }
}


exports.getAmount = async (req, res, next) => {
    try {
        const email = req.user.email;
        const amount = req.body.amount
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        user.amount += amount;
        user.pending += amount;

        await user.save();

        res.json({ success: true, status: 'completed' });
    } catch (error) {
        res.json({ success: false, status: 'failed' });
    }
}
