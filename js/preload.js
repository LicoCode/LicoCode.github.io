// This file is used to preload image resources to improve page loading performance and user experience.

// Function to preload images
// Parameters: urls - A list of image URLs to preload
export function preloadImages(...urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}