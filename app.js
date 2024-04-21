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
  .attr('width', '480px') // Set width to match CSS
  .attr('height', '480px') // Set height to match CSS
  .style('display', 'block') // Remove fixed positioning
  .style('background-color', 'transparent'); // Set background color from CSS

// Draw a circular border
const circleBorder = svg.append('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', 150)
  .attr('stroke', 'black')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

  const secondLine = svg.append('line') // New line for seconds
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 120) // Lengthen the line
  .attr('y2', 0)
  .attr('stroke', 'white') 
  .attr('stroke-width', 1) // Increase the stroke width
  .attr('transform', 'rotate(-90)'); // Start from 12 o'clock position


// Set up the hour and minute circles
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

// Add CSS for the animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes shine {
  0% { fill-opacity: 0; }
  50% { fill-opacity: 1; }
  100% { fill-opacity: 0; }
}

/* Only apply shine animation to the minute circle */
#minuteIcon {
  animation: shine 2s infinite;
  animation-delay: 60s; /* Delay the shine animation for 60 seconds (1 minute) */
}
`;
document.head.appendChild(style);

// Assign an id to the minute circle for targeting it in CSS
minuteIcon.attr('id', 'minuteIcon');


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

const bigTimeGroup = svg.append('g')
  .attr('id', 'big-time')
  .attr('filter', 'url(#blurFilter)') // Apply blur filter
  .style('opacity', 0.5); // Set opacity for transparency

const bigTimeText = bigTimeGroup.append('text')
  .attr('x', 0)
  .attr('y', 20)
  .attr('font-size', '80px') // Adjust font size for big time display
  .attr('fill', 'white') // Set text color from CSS
  .attr('text-anchor', 'middle'); // Center align text

// Define blur filter
const defs = svg.append('defs');
const blurFilter = defs.append('filter')
  .attr('id', 'blurFilter')
  .append('feGaussianBlur')
  .attr('stdDeviation', 3); // Adjust blur intensity

function updateBigTime() {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // Format time as HH:MM
  bigTimeText.text(formattedTime);
}

updateBigTime(); // Initial update

// Call updateBigTime every second
setInterval(updateBigTime, 1000);









// Time Tracker Function with visibility control for the main sections
document.getElementById('btn').addEventListener('click', function() {
  var minutes = document.getElementById('minutesInput').value;
  if (!isNaN(minutes) && minutes > 0) {
    startTimer(minutes);
    this.style.display = 'none'; // Hide the "Start Timer" button when timer starts
    document.getElementById('resetBtn').style.display = 'inline-block'; // Show the reset button
    document.getElementById('main-sections').style.display = 'block'; // Show the main sections
  } else {
    alert('Please enter a valid number of minutes.');
  }
});

// Function to start the timer
function startTimer(duration) {
  var timer = duration * 60;
  var display = document.getElementById('countdown');
  var minutes, seconds;
  var timerInterval = setInterval(function() {
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

// Function to reset the timer and hide main sections
document.getElementById('resetBtn').addEventListener('click', function() {
  clearInterval(timerInterval);
  resetTimer();
  document.getElementById('btn').style.display = 'inline-block';
  this.style.display = 'none';
  document.getElementById('main-sections').style.display = 'none'; // Hide the main sections
  document.getElementById('blackScreen').style.display = 'none';
});

function resetTimer() {
  var display = document.getElementById('countdown');
  display.textContent = '00:00';
}

document.getElementById('redirectBtn').addEventListener('click', function() {
  window.location.href = 'detox.html';
});

const icons = document.querySelectorAll('.bottom-icons a');
icons.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = icon.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});



