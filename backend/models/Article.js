const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['elderly-care', 'health-tips', 'caregiving', 'nutrition']
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    readTime: {
        type: Number,
        required: true
    },
    featuredImage: {
        type: String
    },
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    publishedAt: {
        type: Date
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create SEO-friendly URLs
articleSchema.pre('save', function(next) {
    if (!this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    next();
});

// Add indexes for better search performance
articleSchema.index({ title: 'text', content: 'text', tags: 'text' });
articleSchema.index({ slug: 1 });
articleSchema.index({ category: 1 });
articleSchema.index({ status: 1, publishedAt: -1 });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
