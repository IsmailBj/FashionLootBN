const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const saltRounds = 10;
require('dotenv').config();


exports.registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const existingUser = await UserModel.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

        const newUser = new UserModel({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            gender: userData.gender
        });

        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, pass } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(pass);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: userl._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            message: 'Login successful',
            token,
            payload: {
                username: user.username,
                email: user.email,
                gender: user.gender
            }
        });

    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserData = async (req, res) => {
    try {
        const email = req.user.email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: false, message: 'User not found' });
        }
        res.status(200).json({ message: "user data send successful", payload: { isUserLogin: true, username: user.username, email: user.email, wallet: { amount: user.amount, pending: user.amount } } })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error getUserData' });
    }
}

exports.getAddressList = async (req, res) => {
    try {
        const email = req.user.email;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const addresses = user.addresses;

        if (!addresses || addresses.length === 0) {
            return res.status(200).json({ error: 'No addresses saved for the user' });
        }

        res.status(200).json({ message: "user address list send successful", addresses });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.setNewAddress = async (req, res) => {
    try {
        const email = req.user.email;
        const addressData = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.addresses.push(addressData);

        await user.save();
        res.status(200).json({ message: 'Address updated successfully', addresses: user.addresses });
    } catch (error) {
        console.error('Error setting new address:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.getAmount = async (req, res) => {
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

        res.status(200).json({ message: 'completed' });
    } catch (error) {
        res.json({ message: 'failed' });
    }
}


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find().select('-password');

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}