console.log('config.js loaded');

// Configuration for API endpoints
const config = {
    // This will automatically use the Render URL in production
    API_URL: (() => {
        const hostname = window.location.hostname;
        console.log('Current hostname:', hostname);

        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:5000';  // Local development
        }

        // For Render deployment
        return 'https://carebridge-platform.onrender.com';  // Matches your Render service name
    })()
};

// Log the configuration for debugging
console.log('Current hostname:', window.location.hostname);
console.log('API URL configured as:', config.API_URL);

// Export the config
window.appConfig = config;
console.log('window.appConfig set to:', window.appConfig);
