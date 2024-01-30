const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    amount: { type: Number, require: false, default: 0 },
    currency: { type: String, require: false, default: "USD" },
});


userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.getAmount = async function (email) {
    try {
        const user = await this.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }
        resUser = { amount: user.amount, currency: user.currency }
        return resUser
    } catch (error) {
        throw new Error('Error getting user amount');
    }
};


userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model('User', userSchema);


UserModel.createIndexes();

module.exports = UserModel;
