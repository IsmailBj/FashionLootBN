const UserModel = require('../models/user.model')

exports.registerUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = new UserModel(
            userData.username,
            userData.email,
            userData.password,
            userData.gender
        );
        await newUser.save();
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findByEmail(email);

        if (!user) {
            console.log('user not found')
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            console.log('password not found')
            return res.json({ success: false, message: 'Invalid email or password' });
        }
        res.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}