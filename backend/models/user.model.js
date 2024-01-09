// userModel.js
const { getDb } = require('../utils/database');
const bcrypt = require('bcrypt');

class UserModel {
    constructor(username, email, password, gender) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.gender = gender;
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }

    async save() {
        try {
            const db = getDb();
            await this.hashPassword();
            await db.collection('users').insertOne(this);

            console.log('User saved successfully');
        } catch (error) {
            console.error('Error during user save:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        const db = getDb();
        const userData = await db.collection('users').findOne({ email });
        console.log(userData)
        if (!userData) {
            return null;
        }

        const user = new UserModel(
            userData.username,
            userData.email,
            userData.password,
            userData.gender
        );

        return user;
    }
}

module.exports = UserModel;
