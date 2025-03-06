const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { body } = require("express-validator"); // Import body for validation

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

// Login Route
router.post(
    "/login",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    usersController.login
);

// Register, send verification code, verify code and register
router.post("/register", usersController.createUser);
router.post("/send-code", usersController.sendVerificationCode); // Register & send code
router.post("/verify-code", usersController.verifyCodeAndRegister); // Verify code & update user

module.exports = router;
