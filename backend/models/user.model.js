const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
    country: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    phoneNr: { type: String, require: false },
    city: { type: String, required: false },
    street: { type: String, required: false },
    streetNumber: { type: String, required: false },
    postCode: { type: String, required: false },
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    amount: { type: Number, require: false, default: 0 },
    pending: { type: Number, require: false, default: 0 },
    boxCount: { type: Number, require: true, default: 0 },
    addresses: [addressSchema]
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

module.exports = UserModel