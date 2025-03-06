const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailService = require("../services/emailService");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        user ? res.json(user) : res.status(404).json({ error: "User not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, password, email, icon } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            favorite_games,
            icon,
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        await User.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "User updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ where: { name } });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        // Respond with token and user details (excluding password)
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                icon: user.icon
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.sendVerificationCode = async (req, res) => {
    try {
        const { name, email, password, icon } = req.body;

        // Check if email is already registered
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ error: "Email already registered" });

        // Check if name is already in use
        const existingName = await User.findOne({ where: { name } });
        if (existingName) return res.status(400).json({ error: "Name is in use" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

        // Create user with only required fields
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            icon,
            verification_code: verificationCode,
            verified: false, // Mark as unverified
            favorite_games: null,
            friends: null,
        });

        // Send verification email
        await emailService.sendVerificationEmail(email, verificationCode);
        console.log(`Verification code ${verificationCode} sent to ${email}`);

        res.status(201).json({ message: "Verification code sent to email. Please verify your account." });
    } catch (err) {
        console.error("Error in sendVerificationCode:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.verifyCodeAndRegister = async (req, res) => {
    try {
        const { email, code } = req.body;

        // Validate input
        if (!email || !code) {
            return res.status(400).json({ error: "Email and verification code are required." });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Ensure verification code matches
        if (user.verification_code !== code) {
            return res.status(400).json({ error: "Invalid verification code. Please try again." });
        }

        // Update user to verified and remove the verification code
        await user.update({
            verified: true,
            verification_code: null,
        });

        res.status(200).json({ message: "Email verified successfully! Your account is now active." });
    } catch (err) {
        console.error("Error in verification:", err);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};
