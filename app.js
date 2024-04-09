// Display Clock 
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const clockSection = d3.select("#clock-section"); // Select the clock section div

const clock = clockSection.append('div').attr('id', 'clock').classed('color-changing', true); // Add class to clock element

const svg = clock.append('svg')
  .attr('viewBox', "-150 -150 300 300")
  .attr('width', '600px') // Set width to match CSS
  .attr('height', '600px') // Set height to match CSS
  .style('display', 'block') // Remove fixed positioning
  .style('background-color', 'transparant'); // Set background color from CSS

const grid = svg.append('g');

for (let i = 0; i < 360; i += 6) {
  grid.append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 130 * Math.cos(i * Math.PI / 180))
    .attr('y2', 130 * Math.sin(i * Math.PI / 180))
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




// Time Tracker Function
document.getElementById('btn').addEventListener('click', function() {
  var minutes = document.getElementById('minutesInput').value;
  if (!isNaN(minutes) && minutes > 0) {
    startTimer(minutes);
    this.style.display = 'none'; // Hide the "Take a Break" button when timer starts
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
      document.getElementById('btn').style.display = 'inline-block'; // Show the "Take a Break" button when timer ends
      document.getElementById('resetBtn').style.display = 'none'; // Hide the reset button
    }
  }, 1000);
}

// Function to reset the timer
document.getElementById('resetBtn').addEventListener('click', function() {
  clearInterval(timerInterval); // Stop the timer interval
  resetTimer();
  document.getElementById('btn').style.display = 'inline-block'; // Show the "Take a Break" button when reset
  this.style.display = 'none'; // Hide the reset button after resetting
});

function resetTimer() {
  var display = document.getElementById('countdown');
  display.textContent = '00:00'; // Reset the timer to 00:00
}










