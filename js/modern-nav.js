// Modern Navigation JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const modernNav = document.querySelector('.modern-nav');
    const navItems = document.querySelectorAll('.nav-item');
    let lastScrollY = window.scrollY;
    let isMenuOpen = false;

    // Add index to nav items for staggered animation
    navItems.forEach((item, index) => {
        item.style.setProperty('--index', index);
    });

    // Toggle menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Animate nav items
        navItems.forEach((item, index) => {
            if (isMenuOpen) {
                item.style.transitionDelay = `${index * 0.1}s`;
            } else {
                item.style.transitionDelay = '0s';
            }
        });
    }

    // Close menu
    function closeMenu() {
        if (!isMenuOpen) return;
        
        isMenuOpen = false;
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Reset nav items animation
        navItems.forEach(item => {
            item.style.transitionDelay = '0s';
        });
    }

    // Event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu on link click
    if (navLinks) {
        navLinks.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                closeMenu();
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle')) {
            closeMenu();
        }
    });

    // Handle scroll behavior
    let scrollTimeout;
    function handleScroll() {
        if (window.scrollY > 100) {
            if (window.scrollY > lastScrollY && !isMenuOpen) {
                modernNav.classList.add('nav-hidden');
            } else {
                modernNav.classList.remove('nav-hidden');
            }
        }
        lastScrollY = window.scrollY;

        // Always show nav at the top
        if (window.scrollY === 0) {
            modernNav.classList.remove('nav-hidden');
        }

        // Reset scroll timeout
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            modernNav.classList.remove('nav-hidden');
        }, 1000);
    }

    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Set active link based on current page
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || 
            (currentPath === '/' && href === 'index.html') ||
            (currentPath.endsWith(href))) {
            link.classList.add('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });
});