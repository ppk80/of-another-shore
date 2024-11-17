function adjustFrameSize(frameDiv) {
  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const viewportAspectRatio = viewportWidth / viewportHeight;
  let scalingFactor;

  // Get frame div dimensions
  const divWidth = frameDiv.offsetWidth;
  const divHeight = frameDiv.offsetHeight;
  const divAspectRatio = divWidth / divHeight;

  // Check the aspect ratio condition and adjust dimensions for frameDiv
  if (divAspectRatio >= viewportAspectRatio) {
	scalingFactor = viewportWidth / divWidth;  
    frameDiv.style.width = `${viewportWidth}px`;
    frameDiv.style.height = `${(divHeight * viewportWidth) / divWidth}px`;
	adjustOtherDivs(scalingFactor, divWidth, divHeight);
	
  } else {
	scalingFactor = viewportHeight / divHeight;  
    frameDiv.style.height = `${viewportHeight}px`;
    frameDiv.style.width = `${(divWidth * viewportHeight) / divHeight}px`;
	adjustOtherDivs(scalingFactor, divWidth, divHeight);
  }

  // Center frameDiv at 50% of viewport width and height
  frameDiv.style.position = 'absolute'; // Ensure position is absolute for centering
  frameDiv.style.left = '50%';
  frameDiv.style.top = '50%';
  frameDiv.style.transform = 'translate(-50%, -50%)'; // Center around the midpoint
}

function adjustOtherDivs(scalingFactor, frameWidth, frameHeight) {
  // Select all elements with class 'h' except frameDiv
  const otherDivs = document.querySelectorAll('div:not(.static)');

  otherDivs.forEach((div) => {
    const divWidth = div.offsetWidth;
    const divHeight = div.offsetHeight;

    // Scale width and height of each .h div
    div.style.height = `${divHeight * scalingFactor}px`;
    div.style.width = `${divWidth * scalingFactor}px`;
	
    // Adjust font size based on scaling factor
    const originalFontSize = parseFloat(window.getComputedStyle(div).fontSize);
    div.style.fontSize = `${originalFontSize * scalingFactor}px`;

    // Positioning based on offset percentages relative to frame dimensions
    const offsetXPercent = parseFloat(div.dataset.offsetX) || 0;
    const offsetYPercent = parseFloat(div.dataset.offsetY) || 0;
    
    // Calculate offsets based on frame dimensions
    const offsetX = (frameWidth * offsetXPercent) / 100;
    const offsetY = (frameHeight * offsetYPercent) / 100;

    // Center the div within frameDiv and apply calculated percentage offsets
    div.style.position = 'absolute';
    div.style.left = '50%';
    div.style.top = '50%';
    div.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
  });
}


// Call adjust functions on load and resize
window.addEventListener('load', () => {
  const frameDiv = document.getElementById('frameDiv');
  adjustFrameSize(frameDiv);
});

window.addEventListener('resize', () => {
  const frameDiv = document.getElementById('frameDiv');
  adjustFrameSize(frameDiv);
});


