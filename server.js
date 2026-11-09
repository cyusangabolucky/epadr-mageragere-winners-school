
// ==========================================
// EPADR MAGERAGERE WINNERS SCHOOL
// BACKEND SERVER
// ==========================================

// Import required packages
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files from public folder
app.use(express.static(path.join(__dirname, "public")));

// ==========================================
// EMAIL CONFIGURATION
// ==========================================

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ==========================================
// CONTACT FORM API
// ==========================================

app.post("/api/contact", async (req, res) => {

    try {

        // Get information from the contact form
        const { name, email, subject, message } = req.body;

        // Check required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please complete all required fields."
            });
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        // Send email to the school
        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.SCHOOL_EMAIL,

            replyTo: email,

            subject: subject || "New School Website Enquiry",

            text: `
New message from EPADR MAGERAGERE WINNERS SCHOOL website.

Name: ${name}

Email: ${email}

Message:
${message}
            `

        });

        // Respond to frontend
        res.status(200).json({
            success: true,
            message: "Your message has been sent successfully!"
        });

    } catch (error) {

        console.error("Email error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to send your message. Please try again later."
        });

    }

});

// ==========================================
// START SERVER
// ==========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("================================");
    console.log("EPADR SCHOOL BACKEND IS RUNNING");
    console.log(`http://localhost:${PORT}`);
    console.log("================================");

});
