const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Get all published articles
router.get('/', async (req, res) => {
    try {
        console.log('📨 Received request for articles');
        
        const articles = await Article.find()
            .sort({ publishedAt: -1 })
            .select('title excerpt content category image author publishedAt readTime');

        const total = await Article.countDocuments(query);

        console.log('📝 Found articles:', articles.length);
        console.log('First article:', articles[0]);
        
        res.json({
            articles,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single article by slug
router.get('/:slug', async (req, res) => {
    try {
        const article = await Article.findOne({
            slug: req.params.slug,
            status: 'published'
        }).populate('author', 'name');

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Increment view count
        article.views += 1;
        await article.save();

        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new article (Protected route - add authentication middleware)
router.post('/', async (req, res) => {
    try {
        const article = new Article({
            ...req.body,
            author: req.user._id // This will come from auth middleware
        });

        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an article (Protected route)
router.put('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Check if user is the author
        if (article.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        Object.assign(article, req.body);
        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an article (Protected route)
router.delete('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Check if user is the author
        if (article.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await article.remove();
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get related articles
router.get('/:slug/related', async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const relatedArticles = await Article.find({
            _id: { $ne: article._id },
            status: 'published',
            $or: [
                { category: article.category },
                { tags: { $in: article.tags } }
            ]
        })
            .select('-content')
            .limit(3)
            .sort({ publishedAt: -1 });

        res.json(relatedArticles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
