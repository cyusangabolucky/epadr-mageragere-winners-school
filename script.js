```javascript
// ==========================================
// EPADR MAGERAGERE WINNERS SCHOOL
// FRONTEND JAVASCRIPT
// ==========================================


// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================

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


// ==========================================
// 2. AUTOMATIC FOOTER YEAR
// ==========================================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// ==========================================
// 3. CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contact-form");

const formMessage = document.getElementById("form-message");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        // Prevent normal page reload
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const tel = document.getElementById("tel").value.trim();

        const message = document.getElementById("message").value.trim();


        // Check required fields
        if (!name || !email || !tel || !message) {

            formMessage.textContent =
                "Please fill in all fields.";

            return;

        }


        // Show sending message
        formMessage.textContent = "Sending your message...";


        // Get submit button
        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent = "Sending...";

        }


        try {

            // Send information to Render backend
            const response = await fetch(
                "https://epadr-mageragere-winners-school.onrender.com/api/contact",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,
                        email: email,
                        tel: tel,
                        message: message

                    })

                }
            );


            // Read response as text first
            const responseText = await response.text();

            let result;

            try {

                // Convert backend response into JSON
                result = JSON.parse(responseText);

            } catch (error) {

                // Handle unexpected HTML or invalid JSON
                throw new Error(
                    "Server returned an invalid response. Please try again later."
                );

            }


            // Check if request was successful
            if (!response.ok) {

                throw new Error(
                    result.message || "Failed to send your message."
                );

            }


            // Display success message
            formMessage.textContent =
                result.message || "Your message has been sent successfully!";


            // Clear form after successful submission
            contactForm.reset();


        } catch (error) {

            console.error("Contact form error:", error);

            formMessage.textContent =
                error.message || "Something went wrong. Please try again.";


        } finally {

            // Enable button again
            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent = "Send Message";

            }

        }

    });

}


// ==========================================
// 4. AUTOMATIC TYPING AND ERASING
// ==========================================

const typingText = document.getElementById("typing-text");

const words = [

    "Welcome to EPADR MAGERAGERE WINNERS SCHOOL",

    "Bright Education",

    "Bright Future",

    "Quality Education",

    "Developing Talents",

    "Building Tomorrow's Leaders"

];

let wordIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    // Stop if this page has no typing element
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

    }

    else if (deleting && characterIndex === 0) {

        deleting = false;

        wordIndex = (wordIndex + 1) % words.length;

        speed = 500;

    }


    setTimeout(typeEffect, speed);

}


// Start typing effect
if (typingText) {

    typeEffect();

}


// ==========================================
// 5. AUTOMATIC IMAGE SLIDER
// ==========================================

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;


function changeSlide() {

    if (slides.length === 0) return;

    slides[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add("active");

}


// Change image every 4 seconds
if (slides.length > 1) {

    setInterval(changeSlide, 4000);

}


// ==========================================
// 6. BACK TO TOP BUTTON
// ==========================================

const backToTop = document.getElementById("backToTop");


if (backToTop) {

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

}


// ==========================================
// END OF FRONTEND JAVASCRIPT
// ==========================================
```