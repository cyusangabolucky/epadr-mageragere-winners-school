
// ==========================================
// EPADR MAGERAGERE WINNERS SCHOOL
// FRONTEND JAVASCRIPT
// ==========================================

// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("open");

        const isOpen = nav.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    // Close menu after clicking a navigation link
    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


// 2. AUTOMATIC FOOTER YEAR

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// 3. CONTACT FORM

const contactForm = document.getElementById("contact-form");

const formMessage = document.getElementById("form-message");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        // Prevent normal page reload
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();

        // Check empty fields
        if (!name || !email || !message) {

            formMessage.textContent = "Please fill in all required fields.";

            return;

        }

        // Show sending message
        formMessage.textContent = "Sending your message...";

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {

            // Send information to backend
            const response = await fetch("/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name,
                    email,
                    subject,
                    message

                })

            });

            // Read backend response
            const result = await response.json();

            if (!response.ok) {

                throw new Error(result.message);

            }

            // Display success message
            formMessage.textContent = result.message;

            // Clear form
            contactForm.reset();

        } catch (error) {

            console.error("Contact form error:", error);

            formMessage.textContent =
                error.message || "Something went wrong. Please try again.";

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
            }

        }

    });

}


// ===================================
// AUTOMATIC TYPING AND ERASING
// ===================================

const typingText = document.getElementById("typing-text");

const words = [
    "Welcome to EPADR MAGERAGERE WINNERS SCHOOL",
    
    "Bright Education",
    "Bright Future",
    "Quality Education",
    "Developing Talents",
    "Building tomorrow Leaders"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (deleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }

    typingText.textContent =
        currentWord.substring(0, characterIndex);

    let speed = deleting ? 50 : 100;

    if (!deleting && characterIndex === currentWord.length) {

        deleting = true;
        speed = 2500;

    } else if (deleting && characterIndex === 0) {

        deleting = false;

        wordIndex = (wordIndex + 1) % words.length;

        speed = 500;

    }

    setTimeout(typeEffect, speed);

}

typeEffect();

// AUTOMATIC IMAGE SLIDER

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function changeSlide() {

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add("active");

}

if (slides.length > 1) {
    setInterval(changeSlide, 4000);
}


// Get the back to top button
const backToTop = document.getElementById("backToTop");

// Show button when scrolling down
window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }

});

// Scroll smoothly to the top
backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
