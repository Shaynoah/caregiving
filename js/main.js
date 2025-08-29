// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
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
const caregivers = [
    {
        name: "Jane Doe",
        experience: "5 years",
        specialties: ["Elderly Care", "Medication Management"],
        location: "Nairobi Central",
        rating: 4.8,
        image: "images/caregiver1.jpg"
    },
    {
        name: "John Smith",
        experience: "3 years",
        specialties: ["Disability Care", "Physical Therapy"],
        location: "Westlands",
        rating: 4.7,
        image: "images/caregiver2.jpg"
    },
    {
        name: "Mary Johnson",
        experience: "7 years",
        specialties: ["Dementia Care", "Post-Surgery Care"],
        location: "Karen",
        rating: 4.9,
        image: "images/caregiver3.jpg"
    }
];

// Function to create caregiver cards
function createCaregiverCards() {
    const caregiverGrid = document.querySelector('.caregivers-grid');
    
    caregivers.forEach(caregiver => {
        const card = document.createElement('div');
        card.className = 'service-card caregiver-card';
        
        // Create rating stars
        const stars = Array(5).fill('').map((_, index) => {
            return `<i class="fas fa-star ${index < Math.floor(caregiver.rating) ? 'active' : ''}"></i>`;
        }).join('');

        card.innerHTML = `
            <div class="caregiver-image">
                <img src="${caregiver.image}" alt="${caregiver.name}">
            </div>
            <h3>${caregiver.name}</h3>
            <div class="caregiver-rating">
                ${stars}
                <span>${caregiver.rating}</span>
            </div>
            <p><i class="fas fa-clock"></i> ${caregiver.experience} experience</p>
            <p><i class="fas fa-location-dot"></i> ${caregiver.location}</p>
            <div class="specialties">
                ${caregiver.specialties.map(specialty => 
                    `<span class="specialty-tag">${specialty}</span>`
                ).join('')}
            </div>
            <button class="cta-button">View Profile</button>
        `;
        
        caregiverGrid.appendChild(card);
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Here you'll add the code to send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message (replace with proper notification system)
    alert('Thank you for your message. We will get back to you soon!');
    contactForm.reset();
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
