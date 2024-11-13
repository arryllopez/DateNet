document.addEventListener('DOMContentLoaded', function () {
const imageSection = document.querySelector('.image-section');
const totalSlides = 3; // Number of background images
let currentSlide = 1;

function nextSlide() {
    // Remove the current slide class
    imageSection.classList.remove(`slide${currentSlide}`);
    
    // Increment the slide index and reset if it exceeds the total slides
    currentSlide = (currentSlide % totalSlides) + 1;

    // Add the new slide class
    imageSection.classList.add(`slide${currentSlide}`);
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);
});