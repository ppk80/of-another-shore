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
	}

  else {
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
  const otherDivs = document.querySelectorAll('div:not(.static)');

  otherDivs.forEach((div) => {
    // Scale width and height proportionally
    const divWidth = div.offsetWidth
    const divHeight = div.offsetHeight
    
    div.style.width = `${divWidth * scalingFactor}px`;
    div.style.height = `${divHeight * scalingFactor}px`;
    
    // Scale font size
    const computedStyle = window.getComputedStyle(div);
    const originalFontSize = parseFloat(computedStyle.fontSize) / scalingFactor;
    div.style.fontSize = `${originalFontSize * scalingFactor}px`;

    // Calculate scaled offsets relative to frame center
    const offsetXPercent = parseFloat(div.dataset.offsetX) || 0;
    const offsetYPercent = parseFloat(div.dataset.offsetY) || 0;
    
    const offsetX = (frameWidth * scalingFactor * offsetXPercent) / 100;
    const offsetY = (frameHeight * scalingFactor * offsetYPercent) / 100;

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


