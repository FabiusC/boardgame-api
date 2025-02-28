const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userController = {
    register: async (req, res) => {
        const { name, password } = req.body;
        const existingUser = await User.getUserByName(name);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.createUser(name, hashedPassword);

        res.status(201).json({ user: newUser });
    },

    login: async (req, res) => {
        const { name, password } = req.body;
        const user = await User.getUserByName(name);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
};

module.exports = userController;
