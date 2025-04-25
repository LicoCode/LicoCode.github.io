// This file is used to preload image resources to improve page loading performance and user experience.

// Function to preload images
// Parameters: urls - A list of image URLs to preload
const preloadImages = (...urls) => {
    urls.forEach(url => {
        const img = new Image(); // Create a new Image object
        img.src = url; // Set the src attribute to trigger image loading
    });
};

// Preload all necessary image resources
preloadImages('./assets/images/zzz.jpg', './assets/images/aaa.jpg', './assets/images/eee.jpg');