console.log('config.js loaded');

// Configuration for API endpoints
const config = {
    // This will automatically use the Render URL in production
    API_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:4527'  // Updated to match the actual port
        : 'https://carebridge-backend.onrender.com'  // Update this to your actual Render backend URL
};

// Log the configuration for debugging
console.log('Current hostname:', window.location.hostname);
console.log('API URL configured as:', config.API_URL);

// Export the config
window.appConfig = config;
console.log('window.appConfig set to:', window.appConfig);
