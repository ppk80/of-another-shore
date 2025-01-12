function initDraggable(element) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    element.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    function startDragging(e) {
        isDragging = true;
        
        // Get the current transform values
        const transform = window.getComputedStyle(element).transform;
        const matrix = new DOMMatrix(transform);
        initialX = e.clientX - matrix.m41;
        initialY = e.clientY - matrix.m42;
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        // Get the frame reference
        const frameDiv = document.getElementById('frameDiv');
        const frameBounds = frameDiv.getBoundingClientRect();
        const frameCenter = {
            x: frameBounds.left + frameBounds.width / 2,
            y: frameBounds.top + frameBounds.height / 2
        };

        // Calculate offsets relative to frame center (in pixels)
        const offsetX = currentX - frameCenter.x;
        const offsetY = currentY - frameCenter.y;

        // Convert pixel offsets to percentages relative to frame dimensions
        const offsetXPercent = (offsetX / (frameBounds.width / 2)) * 100;
        const offsetYPercent = (offsetY / (frameBounds.height / 2)) * 100;

        // Update data attributes
        element.dataset.offsetX = offsetXPercent.toFixed(2);
        element.dataset.offsetY = offsetYPercent.toFixed(2);

        // Apply the transform while maintaining the centering transform
        element.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
    }

    function stopDragging() {
        isDragging = false;
    }
}

// Initialize dragging for all non-static divs
document.addEventListener('DOMContentLoaded', () => {
    const draggableDivs = document.querySelectorAll('div:not(.static)');
    draggableDivs.forEach(div => initDraggable(div));
});