// Photo Display
document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch image URLs from JSON file
    const fetchImageUrls = async () => {
        try {
            // Fetch the JSON file containing image URLs
            const response = await fetch('imageUrls.json');
            if (!response.ok) {
                throw new Error('Failed to fetch image URLs');
            }
            const data = await response.json();
            return data.imageUrls;
        } catch (error) {
            console.error('Error fetching image URLs:', error);
            return [];
        }
    };
  
  
  
  // Function to display images in the photo gallery with a slideshow effect
  const displayImagesWithSlideshow = async () => {
    try {
        // Fetch image URLs
        const imageUrls = await fetchImageUrls();
  
        // Select the photo gallery div
        const photoGallery = document.getElementById('photo-gallery-section');
  
        // Clear any existing content
        photoGallery.innerHTML = '';
  
        // Create and append img elements for each image URL
        imageUrls.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = url;
            img.classList.add('gallery-image');
  
            // Set initial opacity to 0 for all images except the first one
            img.style.opacity = index === 0 ? 1 : 0;
  
            photoGallery.appendChild(img);
        });
  
        // Simple slideshow effect
        let currentIndex = 0;
        const images = photoGallery.querySelectorAll('.gallery-image');
  
        const showImage = (index) => {
            // Fade out current image
            images[currentIndex].style.opacity = 0;
  
            // Fade in new image
            images[index].style.opacity = 1;
  
            currentIndex = index;
        };
  
        setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            showImage(nextIndex);
        }, 2000); // Change image every 3 seconds
    } catch (error) {
        console.error('Error displaying images:', error);
    }
  };
  
  // Call the displayImagesWithSlideshow function when the DOM content is loaded
  displayImagesWithSlideshow();})