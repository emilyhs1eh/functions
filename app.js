// Homepage typewriter
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["provides mental space", "focuses on what truly matters", "reclaims control of attention", "enriches wellbeing"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 1000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});













// Display Clock
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const clockSection = d3.select("#clock-section"); // Select the clock section div

const clock = clockSection
  .append('div')
  .attr('id', 'clock')
  .classed('color-changing', true)


const svg = clock
  .append('svg')
  .attr('viewBox', "-150 -150 300 300")
  .attr('width', '600px') // Set width to match CSS
  .attr('height', '600px') // Set height to match CSS
  .style('display', 'block') // Remove fixed positioning
  .style('background-color', 'transparent'); // Set background color from CSS

const grid = svg.append('g');

for (let i = 0; i < 360; i += 6) {
  grid.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 100 * Math.cos(i * Math.PI / 180))
    .attr('y2', 100 * Math.sin(i * Math.PI / 180))
    .attr('stroke', '#fff') // Set stroke color from CSS
    .attr('stroke-width', i % 30 === 0 ? 2 : 1);
}

const secondLine = svg.append('line') // New line for seconds
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 900) // Lengthen the line
  .attr('y2', 0)
  .attr('stroke', '#5460f9')
  .attr('stroke-width', 2)
  .attr('transform', 'rotate(-90)'); // Start from 12 o'clock position

const minuteIcon = svg.append('circle')
  .attr('cx', 0)
  .attr('cy', -75)
  .attr('r', 5)
  .attr('fill', 'black');

const hoursIcon = svg.append('circle')
  .attr('cx', 0)
  .attr('cy', -40)
  .attr('r', 7)
  .attr('fill', 'black');

function loop() {
  const now = Date.now();
  const date = new Date(now);
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  const secondsAngle = (seconds / 60) * 360 - 90; // Adjusted by -90 degrees to start from 12 o'clock position
  const minutesAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hoursAngle = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

  secondLine.transition().duration(1000).attr('transform', `rotate(${secondsAngle})`); // Rotate the second line smoothly over 1 second
  minuteIcon.transition().duration(1000).attr('transform', `rotate(${minutesAngle})`); // Rotate minute icon smoothly
  hoursIcon.transition().duration(1000).attr('transform', `rotate(${hoursAngle})`); // Rotate hour icon smoothly

  setTimeout(loop, 1000 - now % 1000); // Call loop function at the beginning of the next second
}

loop();

let timerInterval; // Global variable to store the interval

function displayTime() {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString();
  clock.text(formattedTime);
}

function resetClock() {
  clock.text('');
}








// Time Tracker Function
document.getElementById('btn').addEventListener('click', function() {
  var minutes = document.getElementById('minutesInput').value;
  if (!isNaN(minutes) && minutes > 0) {
    startTimer(minutes);
    this.style.display = 'none'; // Hide the "Start Timer" button when timer starts
    document.getElementById('resetBtn').style.display = 'inline-block'; // Show the reset button
  } else {
    alert('Please enter a valid number of minutes.');
  }
});

// Function to start the timer
function startTimer(duration) {
  var timer = duration * 60;
  var display = document.getElementById('countdown');
  var minutes, seconds;

  timerInterval = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (--timer < 0) {
      clearInterval(timerInterval);
      display.textContent = "Time's up!";
      document.getElementById('btn').style.display = 'inline-block'; // Show the "Start Timer" button when timer ends
      document.getElementById('resetBtn').style.display = 'none'; // Hide the reset button
      document.getElementById('blackScreen').style.display = 'block'; // Show the black screen
    }
  }, 1000);
}

// Function to reset the timer
document.getElementById('resetBtn').addEventListener('click', function() {
  clearInterval(timerInterval); // Stop the timer interval
  resetTimer();
  document.getElementById('btn').style.display = 'inline-block'; // Show the "Start Timer" button when reset
  this.style.display = 'none'; // Hide the reset button after resetting
  document.getElementById('blackScreen').style.display = 'none'; // Hide the black screen
});

function resetTimer() {
  var display = document.getElementById('countdown');
  display.textContent = '00:00'; // Reset the timer to 00:00
}
















//scroll section
const sections = document.querySelectorAll('.scroll-section');

function smoothScroll(targetSection) {
  const startingY = window.scrollY;
  const targetY = targetSection.offsetTop;
  const distance = targetY - startingY;
  let startTime = null;

  function animate(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const ease = easeInOutQuad(timeElapsed, duration, startingY, distance);
    window.scrollTo(0, ease);
    if (timeElapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      window.scrollTo(0, targetY); // Ensure we reach the exact target position
    }
  }

  const duration = 500; // Adjust duration for desired animation speed (milliseconds)
  requestAnimationFrame(animate);
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c/2 * t * t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
}

sections.forEach(section => {
  section.addEventListener('click', () => {
    smoothScroll(section);
  });
});




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
displayImagesWithSlideshow();





//Music Section 

document.addEventListener("DOMContentLoaded", function() {
  var songLinks = document.querySelectorAll("#song-list a");
  var audio = document.getElementById("meditation-audio");
  var playPauseBtn = document.getElementById("play-pause-btn");

  // Add click event listeners to each song link
  songLinks.forEach(function(songLink) {
      songLink.addEventListener("click", function(event) {
          event.preventDefault(); // Prevent default behavior of link

          // Change the source of the audio element to the clicked song
          audio.src = songLink.getAttribute("data-src");

          // Play the audio
          audio.play();

          // Update play/pause button text
          playPauseBtn.textContent = "Pause";
      });
  });

  // Add click event listener to play/pause button
  playPauseBtn.addEventListener("click", function() {
      if (audio.paused) {
          // If audio is paused, play it
          audio.play();
          playPauseBtn.textContent = "Pause";
      } else {
          // If audio is playing, pause it
          audio.pause();
          playPauseBtn.textContent = "Play";
      }
  });
});

// JavaScript code to add active class to each audio container
document.addEventListener("DOMContentLoaded", function() {
  const audioContainers = document.querySelectorAll(".audio-container");
  audioContainers.forEach((container, index) => {
    setTimeout(() => {
      container.classList.add("active");
    }, index * 1000); // Adjust the delay as needed
  });
});









//Spin wheel
const wheel = document.getElementById("wheel");
const wheelContainer = document.getElementById("wheel-container");
const spinBtn = document.getElementById("spin-btn");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, label: "photo" },
  { minDegree: 31, maxDegree: 90, label: "music" },
  { minDegree: 91, maxDegree: 150, label: "clock" },
  { minDegree: 151, maxDegree: 210, label: "photo" },
  { minDegree: 211, maxDegree: 270, label: "music" },
  { minDegree: 271, maxDegree: 330, label: "clock" },
  { minDegree: 331, maxDegree: 360, label: "photo" },
];

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  let label = "";
  for (let i of rotationValues) {
    // If the angleValue is between min and max then set the label
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      label = i.label;
      break;
    }
  }
  // Enable the spin button
  spinBtn.disabled = false;
};

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];

const pieColors = [
  "#B0B1CC",
  "#869FBC",
];

// Create chart
const myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [
      'photo',
      'music',
      'clock',
      'photo',
      'music',
      'clock'
    ],
    datasets: [{
      backgroundColor: pieColors,
      data: data,
    }],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 16  },
        // Enable HTML rendering for labels
        useHTML: true,
      },
    },
  },
});

// Enable the spin button
spinBtn.disabled = false;

// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;

// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  // Generate random degrees to stop at
  const randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // Interval for rotation animation
  const rotationInterval = window.setInterval(() => {
    // Set rotation for piechart
    myChart.options.rotation = myChart.options.rotation + resultValue;
    // Update chart with new value;
    myChart.update();
    // If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});


// Add transparent div elements over each section of the pie chart
const pieSections = wheel.getElementsByTagName("path");
const sectionLinks = [
  "#photo-gallery-section",
  "#music-section",
  "#clock-section",
  "#photo-gallery-section",
  "#music-section",
  "#clock-section"
];

for (let i = 0; i < pieSections.length; i++) {
  const overlayDiv = document.createElement("div");
  overlayDiv.classList.add("pie-section-overlay");
  overlayDiv.style.position = "absolute";
  overlayDiv.style.width = pieSections[i].getAttribute("d").split(" ")[1] + "px";
  overlayDiv.style.height = pieSections[i].getAttribute("d").split(" ")[2] + "px";
  overlayDiv.style.left = pieSections[i].getBoundingClientRect().left - wheelContainer.getBoundingClientRect().left + "px";
  overlayDiv.style.top = pieSections[i].getBoundingClientRect().top - wheelContainer.getBoundingClientRect().top + "px";
  overlayDiv.dataset.link = sectionLinks[i];
  wheelContainer.appendChild(overlayDiv);
}

// Add click event listeners to the transparent div elements
const overlayDivs = document.querySelectorAll(".pie-section-overlay");
overlayDivs.forEach(overlayDiv => {
  overlayDiv.addEventListener("click", () => {
    const sectionId = overlayDiv.dataset.link;
    window.location.href = sectionId;
  });
});})



