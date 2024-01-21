const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
});

// Hash the password before saving to the database
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

// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create indexes using createIndexes
userSchema.index({ email: 1 }, { unique: true }); // Creating a unique index on the 'email' field

const UserModel = mongoose.model('User', userSchema);

// Explicitly call createIndexes to address the deprecation warning
UserModel.createIndexes();

module.exports = UserModel;
