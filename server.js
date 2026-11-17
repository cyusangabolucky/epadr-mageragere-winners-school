```javascript
// ==========================================
// EPADR MAGERAGERE WINNERS SCHOOL
// BACKEND SERVER
// ==========================================


// 1. IMPORT REQUIRED PACKAGES

const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");


// 2. LOAD ENVIRONMENT VARIABLES

dotenv.config();


// 3. CREATE EXPRESS APPLICATION

const app = express();


// 4. MIDDLEWARE

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Allow GitHub Pages and localhost to communicate
app.use(cors({

    origin: [
        "https://cyusangabolucky.github.io",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000"
    ]

}));


// Serve frontend files from public folder
app.use(express.static(path.join(__dirname, "public")));


// ==========================================
// 5. EMAIL CONFIGURATION
// ==========================================

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});


// ==========================================
// 6. CONTACT FORM API
// ==========================================

app.post("/api/contact", async (req, res) => {

    try {

        // Receive information from frontend
        const { name, email, tel, message } = req.body;


        // Check required fields
        if (!name || !email || !tel || !message) {

            return res.status(400).json({

                success: false,

                message: "Please complete all fields."

            });

        }


        // Validate email address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            return res.status(400).json({

                success: false,

                message: "Please enter a valid email address."

            });

        }


        // ==================================
        // SEND EMAIL TO SCHOOL
        // ==================================

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.SCHOOL_EMAIL,

            replyTo: email,

            subject: "New Contact Message - EPADR School",

            text: `

NEW MESSAGE FROM EPADR MAGERAGERE WINNERS SCHOOL WEBSITE

----------------------------------

Name: ${name}

Email: ${email}

Telephone: ${tel}

Message:

${message}

----------------------------------

Sent through the school website.

            `

        });


        // Successful response
        return res.status(200).json({

            success: true,

            message: "Your message has been sent successfully!"

        });


    } catch (error) {

        // Display error in Render logs
        console.error("EMAIL ERROR:", error);


        return res.status(500).json({

            success: false,

            message: "Unable to send your message. Please try again later."

        });

    }

});


// ==========================================
// 7. START SERVER
// ==========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("================================");

    console.log("EPADR SCHOOL BACKEND IS RUNNING");

    console.log(`Server running on port ${PORT}`);

    console.log("================================");

});
