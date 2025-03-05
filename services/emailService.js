const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use app password
    },
    tls: {
        rejectUnauthorized: false, // Fix self-signed certificate issue
    },
});

exports.sendVerificationEmail = async (email, code) => {
    const mailOptions = {
        from: `"ScoreSheet" <${process.env.EMAIL_USER}>`, // Friendly sender name
        to: email,
        subject: "Verify Your Account",
        text: `Your verification code is: ${code}\n\nEnter this code in the app to complete your registration.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent to:", email);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
