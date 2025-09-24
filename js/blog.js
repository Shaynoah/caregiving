document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchArticles');
    const articles = document.querySelectorAll('.article-card');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            const category = article.querySelector('.category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                article.style.display = 'block';
                article.style.animation = 'scaleIn 0.3s ease';
            } else {
                article.style.display = 'none';
            }
        });
    });

    // Newsletter subscription
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Store original button content
            const originalButtonContent = submitButton.innerHTML;
            
            try {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                submitButton.disabled = true;
                
                // Simulate API call (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                window.toast.success(
                    'Successfully Subscribed!',
                    'Thank you for subscribing to our newsletter. You\'ll receive our latest updates soon.'
                );
                
                // Reset form
                emailInput.value = '';
            } catch (error) {
                window.toast.error(
                    'Subscription Failed',
                    'There was a problem subscribing to the newsletter. Please try again.'
                );
            } finally {
                submitButton.innerHTML = originalButtonContent;
                submitButton.disabled = false;
            }
        });
    }

    // Category filter
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category').toLowerCase();
            
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles
            articles.forEach(article => {
                const articleCategory = article.querySelector('.category').textContent.toLowerCase();
                
                if (category === 'all' || articleCategory.includes(category)) {
                    article.style.display = 'block';
                    article.style.animation = 'scaleIn 0.3s ease';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('.article-card img, .featured-article img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
});