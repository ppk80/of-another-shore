var dragItem = null;
var offsetX, offsetY;

// Mouse event listeners
document.addEventListener('mousedown', function(e) {
    // Check if the target is a DIV or IMG and does not have the Static or NoDrag class and is not FrameDiv
    if ((e.target.tagName === 'DIV' || e.target.tagName === 'IMG') &&
        !e.target.classList.contains('Static') && 
        !e.target.classList.contains('NoDrag') && 
        e.target.id !== 'FrameDiv') {
        
        dragItem = e.target;
        offsetX = e.clientX - dragItem.getBoundingClientRect().left;
        offsetY = e.clientY - dragItem.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
});

// Prevent default drag behavior for images
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault(); // Prevent default drag behavior
    }
});

// Touch event listeners
document.addEventListener('touchstart', function(e) {
    // Check if the target is a DIV or IMG and does not have the Static or NoDrag class and is not FrameDiv
    if ((e.target.tagName === 'DIV' || e.target.tagName === 'IMG') &&
        !e.target.classList.contains('Static') && 
        !e.target.classList.contains('NoDrag') && 
        e.target.id !== 'FrameDiv') {
        
        dragItem = e.target;
        const touch = e.touches[0]; // Get the first touch point
        offsetX = touch.clientX - dragItem.getBoundingClientRect().left;
        offsetY = touch.clientY - dragItem.getBoundingClientRect().top;
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    }
});

function onMouseMove(e) {
    if (dragItem) {
        moveItem(e.clientX, e.clientY);
    }
}

function onTouchMove(e) {
    if (dragItem) {
        const touch = e.touches[0]; // Get the first touch point
        moveItem(touch.clientX, touch.clientY);
        e.preventDefault(); // Prevent scrolling while dragging
    }
}

function moveItem(clientX, clientY) {
    let newX = clientX - offsetX;
    let newY = clientY - offsetY;

    // Constrain the image within the viewport
    const rect = dragItem.getBoundingClientRect();
    const minX = 0;
    const minY = 0;
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    // Ensure the image stays within bounds
    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));

    dragItem.style.left = newX + 'px';
    dragItem.style.top = newY + 'px';
}

function onMouseUp() {
    cleanup();
}

function onTouchEnd() {
    cleanup();
}

function cleanup() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    dragItem = null;
}

