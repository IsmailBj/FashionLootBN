const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    gender: String,
});

userSchema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 10);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
