// Configuration for API endpoints
const config = {
    // This will automatically use the Render URL in production
    API_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000'
        : 'https://carebridge-platform.onrender.com'
};

// Export the config
window.appConfig = config;
