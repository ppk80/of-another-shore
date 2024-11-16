// Function to position images based on percentages
function positionImage(img, xPercent, yPercent) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    // Calculate position based on percentages
    const posX = (screenWidth * xPercent / 100) - (imgWidth / 2);
    const posY = (screenHeight * yPercent / 100) - (imgHeight / 2);

    img.style.left = `${posX}px`;
    img.style.top = `${posY}px`;
}

// Initialize images with desired positions
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');
const img4 = document.getElementById('img4');

window.addEventListener('load', () => {
positionImage(img1, 25, 25); // Top-left position
positionImage(img2, 75, 25); // Top-right position
positionImage(img3, 25, 75); // Bottom-left position
positionImage(img4, 75, 75); // Bottom-right position
});


