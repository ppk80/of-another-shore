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
	adjustOtherHDivs(scalingFactor);
	
  } else {
	scalingFactor = viewportHeight / divHeight;  
    frameDiv.style.height = `${viewportHeight}px`;
    frameDiv.style.width = `${(divWidth * viewportHeight) / divHeight}px`;
	adjustOtherHDivs(scalingFactor);
  }

  // Center frameDiv at 50% of viewport width and height
  frameDiv.style.position = 'absolute'; // Ensure position is absolute for centering
  frameDiv.style.left = '50%';
  frameDiv.style.top = '50%';
  frameDiv.style.transform = 'translate(-50%, -50%)'; // Center around the midpoint
}

function adjustOtherHDivs(scalingFactor) {
  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Select all elements with class 'h' except frameDiv
  const otherHDivs = document.querySelectorAll('.h:not(#frameDiv)');

  otherHDivs.forEach((div) => {
    const divWidth = div.offsetWidth;
    const divHeight = div.offsetHeight;

    div.style.height = `${divHeight * scalingFactor}px`;
    div.style.width = `${divWidth * scalingFactor}px`;
	
    // Adjust font size based on scaling factor
    const originalFontSize = parseFloat(window.getComputedStyle(div).fontSize);
    div.style.fontSize = `${originalFontSize * scalingFactor}px`;

    // Resize any images within the div based on scaling factor
    const images = div.querySelectorAll('img');
    images.forEach((img) => {
      const imgWidth = img.offsetWidth;
      const imgHeight = img.offsetHeight;
      img.style.width = `${imgWidth * scalingFactor}px`;
      img.style.height = `${imgHeight * scalingFactor}px`;
    });
  });
}

function initialPositioning() {
  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Select all elements with class 'h' except frameDiv
  const otherHDivs = document.querySelectorAll('.h:not(#frameDiv)');

  otherHDivs.forEach((div) => {
    // Get offset values from the data attributes, assuming percentages
    const offsetXPercent = parseFloat(div.dataset.offsetX) || 0;
    const offsetYPercent = parseFloat(div.dataset.offsetY) || 0;

    // Calculate offsets in pixels based on percentages of viewport dimensions
    const offsetX = (viewportWidth * offsetXPercent) / 100;
    const offsetY = (-viewportHeight * offsetYPercent) / 100;

    // Center the div in the viewport and apply calculated percentage offsets
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
  adjustOtherHDivs();
  initialPositioning();
});

window.addEventListener('resize', () => {
  const frameDiv = document.getElementById('frameDiv');
  adjustFrameSize(frameDiv);
  adjustOtherHDivs();
});


