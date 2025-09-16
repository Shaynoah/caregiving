const mongoose = require('mongoose');
const Article = require('./models/Article');

const sampleArticles = [
    {
        title: "Essential Tips for Caring for Elderly Parents at Home",
        slug: "essential-tips-caring-elderly-parents-home",
        excerpt: "Learn the best practices and essential tips for providing quality care for elderly parents in a home setting.",
        content: `
            <h2>Understanding the Challenges of Elderly Care</h2>
            <p>Caring for elderly parents at home can be both rewarding and challenging. As our parents age, their needs become more complex, requiring careful attention and dedicated care.</p>

            <h3>1. Create a Safe Environment</h3>
            <p>Safety should be your top priority when caring for elderly parents at home:</p>
            <ul>
                <li>Install handrails in bathrooms and hallways</li>
                <li>Remove trip hazards like loose rugs</li>
                <li>Improve lighting in all areas</li>
                <li>Make modifications for better accessibility</li>
            </ul>

            <h3>2. Establish a Daily Routine</h3>
            <p>A consistent daily routine helps create structure and reduces anxiety:</p>
            <ul>
                <li>Regular meal times</li>
                <li>Scheduled medication times</li>
                <li>Regular exercise periods</li>
                <li>Social activities and rest periods</li>
            </ul>

            <h3>3. Monitor Health Carefully</h3>
            <p>Keep track of vital health indicators:</p>
            <ul>
                <li>Regular blood pressure checks</li>
                <li>Medication management</li>
                <li>Doctor's appointments</li>
                <li>Diet and nutrition monitoring</li>
            </ul>
        `,
        category: "elderly-care",
        image: "images/elderly-care-tips.jpg",
        author: "645f3c1720319f4d52f5f5f5", // This will be replaced with actual user ID
        tags: ["elderly care", "home care", "caregiving tips", "senior health"],
        readTime: 8,
        metaTitle: "Essential Tips for Caring for Elderly Parents at Home | CareBridge Kenya",
        metaDescription: "Learn essential tips and best practices for providing quality care to elderly parents at home. Practical advice for creating a safe and comfortable environment.",
        status: "published",
        publishedAt: new Date()
    },
    {
        title: "Understanding Dementia: A Comprehensive Guide for Caregivers",
        slug: "understanding-dementia-guide-caregivers",
        excerpt: "A detailed guide to understanding dementia, its symptoms, and how to provide effective care for those affected.",
        content: `
            <h2>What is Dementia?</h2>
            <p>Dementia is not a single disease but a term that describes a range of symptoms affecting memory, thinking, and social abilities severely enough to interfere with daily life.</p>

            <h3>Common Types of Dementia</h3>
            <ul>
                <li>Alzheimer's Disease (most common)</li>
                <li>Vascular Dementia</li>
                <li>Lewy Body Dementia</li>
                <li>Frontotemporal Dementia</li>
            </ul>

            <h3>Recognizing Early Signs</h3>
            <p>Early detection can help in managing the condition better:</p>
            <ul>
                <li>Memory loss affecting daily activities</li>
                <li>Difficulty with familiar tasks</li>
                <li>Problems with language</li>
                <li>Disorientation to time and place</li>
            </ul>

            <h3>Caregiving Tips</h3>
            <p>Caring for someone with dementia requires patience and understanding:</p>
            <ul>
                <li>Establish routine</li>
                <li>Create a safe environment</li>
                <li>Use clear, simple communication</li>
                <li>Stay positive and supportive</li>
            </ul>
        `,
        category: "health-tips",
        image: "images/dementia-care.jpg",
        author: "645f3c1720319f4d52f5f5f5",
        tags: ["dementia", "alzheimer's", "memory care", "elderly care"],
        readTime: 10,
        metaTitle: "Understanding Dementia: A Guide for Caregivers | CareBridge Kenya",
        metaDescription: "Comprehensive guide to understanding dementia, its types, symptoms, and effective caregiving strategies. Essential information for caregivers and families.",
        status: "published",
        publishedAt: new Date()
    },
    {
        title: "Nutrition Guide for Senior Health and Wellness",
        slug: "nutrition-guide-senior-health-wellness",
        excerpt: "Expert advice on nutrition for seniors, including dietary recommendations and meal planning tips for optimal health.",
        content: `
            <h2>The Importance of Senior Nutrition</h2>
            <p>Proper nutrition becomes increasingly important as we age. A balanced diet can help maintain health, energy, and independence in senior years.</p>

            <h3>Essential Nutrients for Seniors</h3>
            <ul>
                <li>Protein for muscle maintenance</li>
                <li>Calcium and Vitamin D for bone health</li>
                <li>Fiber for digestive health</li>
                <li>Omega-3 fatty acids for brain health</li>
            </ul>

            <h3>Meal Planning Tips</h3>
            <p>Effective meal planning ensures seniors get the nutrition they need:</p>
            <ul>
                <li>Include various colorful fruits and vegetables</li>
                <li>Choose lean proteins</li>
                <li>Incorporate whole grains</li>
                <li>Stay hydrated throughout the day</li>
            </ul>

            <h3>Special Dietary Considerations</h3>
            <p>Address common age-related concerns:</p>
            <ul>
                <li>Reduced appetite</li>
                <li>Difficulty swallowing</li>
                <li>Dietary restrictions</li>
                <li>Medication interactions</li>
            </ul>
        `,
        category: "nutrition",
        image: "images/senior-nutrition.jpg",
        author: "645f3c1720319f4d52f5f5f5",
        tags: ["nutrition", "senior health", "diet", "wellness"],
        readTime: 7,
        metaTitle: "Senior Nutrition Guide: Health and Wellness Tips | CareBridge Kenya",
        metaDescription: "Expert nutrition guide for seniors. Learn about essential nutrients, meal planning, and dietary considerations for optimal senior health and wellness.",
        status: "published",
        publishedAt: new Date()
    }
];

async function seedArticles() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://carebridge_user:care2025@cluster0.hbuq5.mongodb.net/carebridge?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('📡 Connected to MongoDB');

        // Clear existing articles
        await Article.deleteMany({});
        console.log('🗑️ Cleared existing articles');

        // Insert sample articles
        const createdArticles = await Article.insertMany(sampleArticles);
        console.log(`✅ Created ${createdArticles.length} sample articles`);

        console.log('Sample articles:');
        createdArticles.forEach(article => {
            console.log(`- ${article.title} (${article.slug})`);
        });

    } catch (error) {
        console.error('❌ Error seeding articles:', error);
    } finally {
        await mongoose.disconnect();
        console.log('📡 Disconnected from MongoDB');
    }
}

// Run the seeding function
seedArticles();
