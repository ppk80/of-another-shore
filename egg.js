let currentSection = 0;
const sections = document.querySelectorAll('.section');

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
            previousSection();
            break;
        case 'ArrowDown':
        case 'ArrowRight':
            nextSection();
            break;
    }
});

document.getElementById('leftBtn').addEventListener('click', function() {
    previousSection();
});

document.getElementById('rightBtn').addEventListener('click', function() {
    nextSection();
});

function nextSection() {
    if (currentSection < sections.length - 1) {
        sections[currentSection].style.display = 'none'; // Hide current section
        currentSection++;
        sections[currentSection].style.display = 'flex'; // Show next section
    }
}

function previousSection() {
    if (currentSection > 0) {
        sections[currentSection].style.display = 'none'; // Hide current section
        currentSection--;
        sections[currentSection].style.display = 'flex'; // Show previous section
    }
}
