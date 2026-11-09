// EPADR MAGERAGERE WINNERS SCHOOL BACKEND

const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

// Load environment settings
dotenv.config();

// Create server
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Display website files
app.use(express.static(path.join(__dirname, "..")));

// Test server
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "EPADR MAGERAGERE WINNERS SCHOOL server is running!"
    });
});

// Contact form
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }

        if (!process.env.EMAIL_USER ||
            !process.env.EMAIL_PASS ||
            !process.env.EMAIL_TO) {
            return res.status(503).json({
                success: false,
                message: "Email service is not configured."
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: subject || "New School Website Message",
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `
        });

        res.json({
            success: true,
            message: "Your message has been sent successfully!"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Message could not be sent."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log("==================================");
    console.log("EPADR MAGERAGERE WINNERS SCHOOL");
    console.log("Backend server is running!");
    console.log(`http://localhost:${PORT}`);
    console.log("==================================");
});