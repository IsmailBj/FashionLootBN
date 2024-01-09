

exports.registerUser = (req, res, next) => {
    const receivedData = req.body;
    res.json({ success: true, message: 'User registered successfully' });
}

exports.loginUser = (req, res, next) => {
    const receivedData = req.body
    res.json({ success: true, message: 'User login successfully' });
}