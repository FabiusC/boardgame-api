const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

// Register, send verification code, verify code and register
router.post("/register", usersController.createUser);
router.post("/send-code", usersController.sendVerificationCode);  // Register & send code
router.post("/verify-code", usersController.verifyCodeAndRegister); // Verify code & update user

module.exports = router;
