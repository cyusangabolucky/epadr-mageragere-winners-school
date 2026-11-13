
// ================================================
// EPADR MAGERAGERE WINNERS SCHOOL
// BACKEND SERVER
// Node.js + Express + Nodemailer
// ================================================

// Import required packages
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Render provides its own PORT
const PORT = process.env.PORT || 3000;


// ================================================
// 1. CORS CONFIGURATION
// Allow GitHub Pages to communicate with Render
// ================================================

app.use((req, res, next) => {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://cyusangabolucky.github.io"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    // Handle browser preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();

});


// ================================================
// 2. MIDDLEWARE
// ================================================

// Read incoming JSON data
app.use(express.json());

// Read form data
app.use(express.urlencoded({ extended: true }));


// ================================================
// 3. STATIC FILES
// ================================================

// Serve website files if required
app.use(express.static(path.join(__dirname, "..")));


// ================================================
// 4. SERVER STATUS ROUTE
// ================================================

app.get("/api/status", (req, res) => {

    res.status(200).json({

        success: true,

        message:
            "EPADR MAGERAGERE WINNERS SCHOOL server is running!"

    });

});


// ================================================
// 5. CONTACT FORM ROUTE
// ================================================

app.post("/api/contact", async (req, res) => {

    try {

        // Get information sent by the frontend
        const { name, email, subject, message } = req.body || {};


        // Validate required fields
        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof message !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !message.trim()
        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill in all required fields."

            });

        }


        // Check Gmail configuration
        if (
            !process.env.EMAIL_USER ||
            !process.env.EMAIL_PASS ||
            !process.env.EMAIL_TO
        ) {

            console.error("Email environment variables are missing.");

            return res.status(503).json({

                success: false,

                message: "Email service is not configured."

            });

        }


        // Create Gmail transporter
        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: process.env.EMAIL_USER,

                pass: process.env.EMAIL_PASS

            }

        });


        // Send email
        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_TO,

            replyTo: email.trim(),

            subject: subject
                ? subject.trim()
                : "New School Website Message",

            text: `
NEW MESSAGE FROM EPADR MAGERAGERE WINNERS SCHOOL WEBSITE

Name: ${name.trim()}

Email: ${email.trim()}

Subject: ${subject ? subject.trim() : "No subject"}

Message:
${message.trim()}
            `

        });


        // Return successful JSON response
        return res.status(200).json({

            success: true,

            message: "Your message has been sent successfully!"

        });


    } catch (error) {

        // Display error in Render logs
        console.error("EMAIL SENDING ERROR:", error);


        // Return JSON error
        return res.status(500).json({

            success: false,

            message: "Message could not be sent. Please try again later."

        });

    }

});


// ================================================
// 6. GENERAL ERROR HANDLER
// ================================================

app.use((err, req, res, next) => {

    console.error("SERVER ERROR:", err);

    res.status(500).json({

        success: false,

        message: "An unexpected server error occurred."

    });

});


// ================================================
// 7. START SERVER
// ================================================

app.listen(PORT, () => {

    console.log("====================================");

    console.log("EPADR MAGERAGERE WINNERS SCHOOL");

    console.log("Backend server is running!");

    console.log(`Port: ${PORT}`);

    console.log("====================================");

});
