// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample articles data - This would normally come from your database
    const articles = [
        {
            id: 1,
            title: "Essential Tips for Caring for Elderly Parents at Home",
            excerpt: "Learn the best practices and essential tips for providing quality care for elderly parents in a home setting...",
            category: "elderly-care",
            image: "images/image1.png",
            author: "Dr. Sarah Kimani",
            date: "September 15, 2025",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Understanding Dementia: A Guide for Caregivers",
            excerpt: "A comprehensive guide to understanding dementia and providing appropriate care for loved ones affected by it...",
            category: "health-tips",
            image: "images/image2.png",
            author: "Dr. John Mwangi",
            date: "September 14, 2025",
            readTime: "7 min read"
        },
        {
            id: 3,
            title: "Nutrition Tips for Elderly Health and Wellness",
            excerpt: "Discover the important aspects of nutrition for elderly health and how to maintain a balanced diet...",
            category: "nutrition",
            image: "images/image3.png",
            author: "Sarah Wangari",
            date: "September 13, 2025",
            readTime: "4 min read"
        }
        // Add more articles as needed
    ];

    // Initialize the blog
    function initBlog() {
        displayFeaturedArticle();
        displayArticles();
        setupSearch();
        setupCategories();
        setupPagination();
    }

    // Display featured article
    function displayFeaturedArticle() {
        const featuredArticle = articles[0]; // Usually your most recent or selected article
        const featuredHTML = `
            <img src="${featuredArticle.image}" alt="${featuredArticle.title}">
            <div class="featured-content">
                <span class="category">${formatCategory(featuredArticle.category)}</span>
                <h2>${featuredArticle.title}</h2>
                <p>${featuredArticle.excerpt}</p>
                <div class="article-meta">
                    <span><i class="far fa-user"></i> ${featuredArticle.author}</span>
                    <span><i class="far fa-calendar"></i> ${featuredArticle.date}</span>
                    <span><i class="far fa-clock"></i> ${featuredArticle.readTime}</span>
                </div>
            </div>
        `;
        document.getElementById('featuredArticle').innerHTML = featuredHTML;
    }

    // Display articles in grid
    function displayArticles(filteredArticles = articles.slice(1)) {
        const articlesHTML = filteredArticles.map(article => `
            <article class="article-card">
                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="article-content">
                    <span class="category">${formatCategory(article.category)}</span>
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <div class="article-meta">
                        <span><i class="far fa-user"></i> ${article.author}</span>
                        <span><i class="far fa-calendar"></i> ${article.date}</span>
                    </div>
                </div>
            </article>
        `).join('');
        
        document.getElementById('articleGrid').innerHTML = articlesHTML;
    }

    // Setup search functionality
    function setupSearch() {
        const searchInput = document.getElementById('searchArticles');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredArticles = articles.filter(article => 
                article.title.toLowerCase().includes(searchTerm) ||
                article.excerpt.toLowerCase().includes(searchTerm)
            );
            displayArticles(filteredArticles);
        });
    }

    // Setup category filtering
    function setupCategories() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const category = btn.dataset.category;
                const filteredArticles = category === 'all' 
                    ? articles.slice(1)
                    : articles.filter(article => article.category === category);
                displayArticles(filteredArticles);
            });
        });
    }

    // Setup pagination
    function setupPagination() {
        const articlesPerPage = 6;
        const pageCount = Math.ceil((articles.length - 1) / articlesPerPage);
        
        const paginationHTML = Array.from({ length: pageCount }, (_, i) => `
            <button class="${i === 0 ? 'active' : ''}">${i + 1}</button>
        `).join('');
        
        document.getElementById('pagination').innerHTML = paginationHTML;
        
        // Add click handlers
        const pageBtns = document.querySelectorAll('.pagination button');
        pageBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                pageBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const start = index * articlesPerPage + 1;
                const end = start + articlesPerPage;
                displayArticles(articles.slice(start, end));
            });
        });
    }

    // Helper function to format category names
    function formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    // Initialize the blog
    initBlog();
});
