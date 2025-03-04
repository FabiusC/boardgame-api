const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const userController = {
    register: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if Username is Unique
            const usernameExists = await User.checkUsername(name);
            if (usernameExists) {
                return res.status(400).json({ message: 'Username already taken' });
            }

            // Check if Email is Unique
            const emailExists = await User.checkEmail(email);
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            // Hash Password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create User
            const newUser = await User.createUser(name, email, hashedPassword);

            res.status(201).json({
                message: 'User registered successfully',
                user: newUser
            });
        } catch (error) {
            console.error('Registration Error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = userController;
