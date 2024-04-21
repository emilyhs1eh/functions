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
});

