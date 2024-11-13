document.addEventListener('DOMContentLoaded', function () {

    // Show the main content once everything has loaded
window.addEventListener('load', () => {
    const contentContainer = document.querySelector('.content-container');
    contentContainer.style.visibility = 'visible';
    contentContainer.style.opacity = '1';;
    const imageSection = document.querySelector('.image-section');
    imageSection.classList.add('loaded');
  });

  
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