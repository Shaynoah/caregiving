document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Add blog button to navigation
    const navList = document.querySelector('.nav-menu');
    if (navList) {
        const blogButton = document.createElement('li');
        blogButton.innerHTML = `<a href="blog.html" class="nav-blog-button"><i class="fas fa-book-reader"></i>Read Our Blog</a>`;
        navList.appendChild(blogButton);
    }

    // Add floating blog button for mobile
    const body = document.body;
    const floatingButton = document.createElement('a');
    floatingButton.href = 'blog.html';
    floatingButton.className = 'floating-blog-button';
    floatingButton.innerHTML = `<i class="fas fa-book-reader"></i><span>Read Our Blog</span>`;
    body.appendChild(floatingButton);

    // Toggle mobile menu
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Handle scroll effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});
