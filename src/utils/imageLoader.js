/**
 * Image Loader Utility
 * Handles loading images with fallbacks and error handling
 *
 * @format
 */

/**
 * Get the appropriate image URL - tries multiple paths
 * @param {string} imagePath - The image path from API or data
 * @returns {string} - The resolved image path
 */
export const getImageUrl = (imagePath) => {
	if (!imagePath) return null;

	// If it's already an absolute URL, return as is
	if (imagePath.startsWith("http")) {
		return imagePath;
	}

	// If it starts with /, use as is (root relative)
	if (imagePath.startsWith("/")) {
		return imagePath;
	}

	// Otherwise, prepend / to make it root relative
	// This helps with Vite dev server proxy
	return `/${imagePath}`;
};

/**
 * Handle image load errors with fallback
 * @param {Event} e - The error event
 * @param {Function} onError - Optional callback for error handling
 */
export const handleImageError = (e, onError) => {
	console.error("Image failed to load:", e.target.src);
	if (onError) {
		onError(e);
	}
	// Hide the image on error
	e.target.style.display = "none";
};

/**
 * Handle successful image load
 * @param {string} src - The image source that loaded
 */
export const handleImageLoad = (src) => {
	console.log("Image loaded successfully:", src);
};
