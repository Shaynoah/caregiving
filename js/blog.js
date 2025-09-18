// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
        // Fetch articles from the API
    let articles = [];
    
    async function fetchArticles() {
        try {
            const response = await fetch(`${window.appConfig.API_URL}/api/articles`);
            articles = await response.json();
            return articles;
        } catch (error) {
            console.error('Error fetching articles:', error);
            return [];
        }
    }

    // Initialize the blog
    async function initBlog() {
        await fetchArticles();
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
