
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






//music display
const audio = document.getElementById('meditation-audio');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const volumeControl = document.getElementById('volume-control');

  playPauseBtn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = 'Pause';
    } else {
      audio.pause();
      playPauseBtn.textContent = 'Play';
    }
  });

  volumeControl.addEventListener('input', function() {
    audio.volume = volumeControl.value / 100;
  });



  document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audio-player");
    const playlistItems = document.querySelectorAll("#playlist li a");
  
    playlistItems.forEach(item => {
      item.addEventListener("click", function(e) {
        e.preventDefault();
        const songSrc = this.getAttribute("data-src");
        audioPlayer.src = songSrc;
        audioPlayer.play();
      });
    });
  });
})










//Spin wheel
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

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
      // Add link to the label based on its value
      switch (label) {
        case "clock":
          finalValue.innerHTML = `<p><a href="#clock-section">Value: ${label}</a></p>`;
          break;
        case "music":
          finalValue.innerHTML = `<p><a href="#music-section">Value: ${label}</a></p>`;
          break;
        case "photo":
          finalValue.innerHTML = `<p><a href="#photo-gallery-section">Value: ${label}</a></p>`;
          break;
        default:
          finalValue.innerHTML = `<p>Value: ${label}</p>`;
      }
      break;
    }
  }


  // Enable the spin button
  spinBtn.disabled = false;
};


// Size of each piece
const data = [16, 16, 16, 16, 16, 16];

const pieColors = [
  "rgb(219, 195, 193)", // #dbc3c1
  "rgb(220, 132, 102)", // #dc8466
  "rgb(153, 149, 141)", // #99958d
  "rgb(81, 80, 81)"     // #515051
];


// Create chart
const myChart = new Chart(wheel, {
  // Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  // Chart Type Pie
  type: "pie",
  data: {
    // Labels (values which are to be displayed on chart)
    labels: ["photo", "music", "clock", "photo", "music", "clock"],
    // Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    // Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      // Hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      // Display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24  },
     
      },
    },
  },
});



// Define functions to scroll to sections
const scrollToClockSection = () => {
  document.getElementById("clock-section").scrollIntoView({ behavior: "smooth" });
};

const scrollToMusicSection = () => {
  document.getElementById("music-section").scrollIntoView({ behavior: "smooth" });
};

const scrollToPhotoGallerySection = () => {
  document.getElementById("photo-gallery-section").scrollIntoView({ behavior: "smooth" });
};



  // Enable the spin button
  spinBtn.disabled = false;


// Spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;

// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  // Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
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
