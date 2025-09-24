const mongoose = require('mongoose');
const Article = require('./models/Article');

const sampleArticles = [
    {
        title: "10 Essential Tips for Caring for Elderly Parents in Nairobi",
        slug: "essential-tips-elderly-care-nairobi",
        excerpt: "Comprehensive guide for families providing care for elderly parents in Nairobi's unique environment, with practical tips and local resources.",
        content: `
            <div class="article-content">
                <h2>Understanding Elderly Care in Nairobi's Context</h2>
                <p>Caring for elderly parents in Nairobi presents unique challenges and opportunities that require a balanced approach combining traditional values with modern healthcare practices.</p>

                <h3>1. Creating a Safe Home Environment</h3>
                <p>Adapt your Nairobi home with these essential modifications:</p>
                <ul>
                    <li>Install handrails in bathrooms and corridors</li>
                    <li>Ensure proper lighting, with backup solutions for power outages</li>
                    <li>Remove trip hazards and arrange furniture for easy navigation</li>
                    <li>Consider local climate when making modifications (ventilation, temperature control)</li>
                </ul>

                <h3>2. Navigating Nairobi's Healthcare System</h3>
                <p>Make the most of available healthcare resources:</p>
                <ul>
                    <li>Build relationships with reliable local healthcare providers</li>
                    <li>Keep updated contacts for nearby hospitals and clinics</li>
                    <li>Understand NHIF coverage and private insurance options</li>
                    <li>Create an emergency response plan considering local traffic patterns</li>
                </ul>

                <h3>3. Nutrition and Local Diet Planning</h3>
                <p>Develop a nutrition plan that incorporates local foods:</p>
                <ul>
                    <li>Balance traditional Kenyan dishes with nutritional needs</li>
                    <li>Source fresh produce from trusted local markets</li>
                    <li>Work with nutritionists familiar with local dietary practices</li>
                    <li>Plan meals that combine comfort foods with healthy options</li>
                </ul>

                <h3>4. Social and Community Integration</h3>
                <p>Maintain strong community connections:</p>
                <ul>
                    <li>Engage with local senior citizen groups</li>
                    <li>Participate in community activities</li>
                    <li>Preserve family traditions and social gatherings</li>
                    <li>Connect with support groups for caregivers in Nairobi</li>
                </ul>

                <h3>5. Cultural Considerations in Care</h3>
                <p>Respect and integrate cultural aspects:</p>
                <ul>
                    <li>Balance traditional and modern care approaches</li>
                    <li>Include extended family in care decisions</li>
                    <li>Respect cultural practices and beliefs</li>
                    <li>Foster intergenerational connections</li>
                </ul>
            </div>
        `,
        category: "elderly-care",
        image: "images/elderly-care-nairobi.jpg",
        author: "645f3c1720319f4d52f5f5f5", // This will be replaced with actual user ID
        tags: ["elderly care", "Nairobi healthcare", "cultural care", "family support", "senior health"],
        readTime: 12,
        metaTitle: "10 Essential Tips for Caring for Elderly Parents in Nairobi | CareBridge Kenya",
        metaDescription: "Comprehensive guide for providing elderly care in Nairobi. Learn about local healthcare, cultural considerations, and practical tips for family caregivers.",
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
