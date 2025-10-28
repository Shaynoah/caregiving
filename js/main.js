// Function to handle location tabs
function initLocationTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const locationContents = document.querySelectorAll('.location-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            locationContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const navbar = document.querySelector('.navbar');

// Footer Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize location tabs
    initLocationTabs();

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        const footer = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>CareBridge</h3>
                            <p>Your Bridge to Trusted Care</p>
                        </div>
                        <div class="footer-section">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="services.html">Services</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h4>Services</h4>
                            <ul>
                                <li>Home Nursing</li>
                                <li>Elderly Care</li>
                                <li>Personal Care</li>
                                <li>Physiotherapy</li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h4>Connect With Us</h4>
                            <div class="social-links">
                                <a href="#"><i class="fab fa-facebook"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2025 CareBridge. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
        footerPlaceholder.innerHTML = footer;
    }
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactFormStatus = document.getElementById('contactFormStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Clear previous status
            contactFormStatus.textContent = '';
            contactFormStatus.className = '';

            try {
                const formData = {
                    name: contactForm.name.value,
                    email: contactForm.email.value,
                    phone: contactForm.phone.value,
                    service: contactForm.service.value,
                    message: contactForm.message.value
                };

                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    // Success
                    contactFormStatus.textContent = data.message;
                    contactFormStatus.className = 'success-message';
                    contactForm.reset();
                } else {
                    // Server returned an error
                    throw new Error(data.message || 'Failed to send message');
                }
            } catch (error) {
                // Handle network or other errors
                contactFormStatus.textContent = error.message || 'An error occurred. Please try again.';
                contactFormStatus.className = 'error-message';
            } finally {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && 
        !mobileMenu.contains(e.target) && 
        mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sample caregiver data (to be replaced with database data later)
// const caregivers = [
//     {
//         name: "Jane Doe",
//         experience: "5 years",
//         specialties: ["Elderly Care", "Medication Management"],
//         location: "Nairobi Central",
//         rating: 4.8,
//         image: "images/caregiver1.jpg"
//     },
//     {
//         name: "John Smith",
//         experience: "3 years",
//         specialties: ["Disability Care", "Physical Therapy"],
//         location: "Westlands",
//         rating: 4.7,
//         image: "images/caregiver2.jpg"
//     },
//     {
//         name: "Mary Johnson",
//         experience: "7 years",
//         specialties: ["Dementia Care", "Post-Surgery Care"],
//         location: "Karen",
//         rating: 4.9,
//         image: "images/caregiver3.jpg"
//     }
// ];

// // Function to create caregiver cards
// function createCaregiverCards() {
//     const caregiverGrid = document.querySelector('.caregivers-grid');
    
//     caregivers.forEach(caregiver => {
//         const card = document.createElement('div');
//         card.className = 'service-card caregiver-card';
        
//         // Create rating stars
//         const stars = Array(5).fill('').map((_, index) => {
//             return `<i class="fas fa-star ${index < Math.floor(caregiver.rating) ? 'active' : ''}"></i>`;
//         }).join('');

//         card.innerHTML = `
//             <div class="caregiver-image">
//                 <img src="${caregiver.image}" alt="${caregiver.name}">
//             </div>
//             <h3>${caregiver.name}</h3>
//             <div class="caregiver-rating">
//                 ${stars}
//                 <span>${caregiver.rating}</span>
//             </div>
//             <p><i class="fas fa-clock"></i> ${caregiver.experience} experience</p>
//             <p><i class="fas fa-location-dot"></i> ${caregiver.location}</p>
//             <div class="specialties">
//                 ${caregiver.specialties.map(specialty => 
//                     `<span class="specialty-tag">${specialty}</span>`
//                 ).join('')}
//             </div>
//             <button class="cta-button">View Profile</button>
//         `;
        
//         caregiverGrid.appendChild(card);
//     });
// }

// Contact form handling
// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(contactForm);

    try {
        // Send form data to Formspree
        const response = await fetch("https://formspree.io/f/movnpdjd", {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            alert('✅ Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        } else {
            alert('❌ Oops! Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error(error);
        alert('⚠️ Network error. Please try again later.');
    }
});


// Initialize animations and components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });

    // Initialize number counters with Intersection Observer
    const countElements = document.querySelectorAll('.count-up');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.innerText);
                let current = 0;
                const duration = 2000; // 2 seconds
                const step = Math.ceil(target / (duration / 16)); // 60fps

                const updateCount = () => {
                    current += step;
                    if (current >= target) {
                        element.innerText = target + '+';
                        counterObserver.unobserve(element);
                        return;
                    }
                    element.innerText = current + '+';
                    requestAnimationFrame(updateCount);
                };
                updateCount();
            }
        });
    }, {
        threshold: 0.5
    });

    countElements.forEach(element => {
        counterObserver.observe(element);
    });

    // GSAP Animations for hero section
    gsap.from('.hero-text', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-badges .badge', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.hero-visual', {
        opacity: 0,
        x: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });

    gsap.from('.floating-card', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        delay: 1,
        ease: 'power3.out'
    });

    gsap.from('.cta-buttons button', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.8,
        ease: 'power3.out'
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize caregiver cards
    createCaregiverCards();
});
