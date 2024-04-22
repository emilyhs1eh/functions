// Access the spin wheel element, container, and spin button from the document
const wheel = document.getElementById("wheel");
const wheelContainer = document.getElementById("wheel-container");
const spinBtn = document.getElementById("spin-btn");

// Define the rotation values for each segment with labels and URLs
const rotationValues = [
  { minDegree: 0, maxDegree: 30, label: "photo", url: "#photo-gallery-section" },
  { minDegree: 31, maxDegree: 90, label: "music", url: "#music-section" },
  { minDegree: 91, maxDegree: 150, label: "clock", url: "#clock-section" },
  { minDegree: 151, maxDegree: 210, label: "photo", url: "#photo-gallery-section" },
  { minDegree: 211, maxDegree: 270, label: "music", url: "#music-section" },
  { minDegree: 271, maxDegree: 330, label: "clock", url: "#clock-section" },
  { minDegree: 331, maxDegree: 360, label: "photo", url: "#photo-gallery-section" },
];

// Function to determine the label and highlight the section based on the final wheel angle
const valueGenerator = (angleValue) => {
  let selectedSegmentIndex = -1;
  for (let i = 0; i < rotationValues.length; i++) {
    if (angleValue >= rotationValues[i].minDegree && angleValue <= rotationValues[i].maxDegree) {
      selectedSegmentIndex = i;
      break;
    }
  }

  // Highlight the selected section
  if (selectedSegmentIndex !== -1) {
    myChart.data.datasets[0].backgroundColor = myChart.data.datasets[0].backgroundColor.map((color, index) =>
      index === selectedSegmentIndex ? "#a1a1a1" : "#B0B1CC" // Change color on selection
    );
    myChart.update();
  }

  // Re-enable the spin button
  spinBtn.disabled = false;
};

// Create chart with Chart.js
const pieColors = [
  "rgba(176, 177, 204, 0.6)",  // Semi-transparent
  "rgba(176, 177, 204, 0.6)",
  "rgba(176, 177, 204, 0.6)",
  "rgba(176, 177, 204, 0.6)",
  "rgba(176, 177, 204, 0.6)",
  "rgba(176, 177, 204, 0.6)"
];

const myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: rotationValues.map(item => item.label),
    datasets: [{
      backgroundColor: pieColors,
      data: [16, 16, 16, 16, 16, 16],
    }],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "black",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 14 },
        font: {family: 'DM MONO'},
        useHTML: true,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const url = rotationValues[elementIndex].url;
        window.location.href = url;
      }
    }
  },
});

// Event listener for the spin button
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  const randomDegree = Math.floor(Math.random() * 360);
  let count = 0;
  let resultValue = 101;

  const rotationInterval = setInterval(() => {
    myChart.options.rotation = (myChart.options.rotation + resultValue) % 360;
    myChart.update();

    if (count > 25) {
      resultValue -= 1;
      if (resultValue < 5) {
        resultValue = 5;
      }
    }

    if (count > 40 && Math.abs(myChart.options.rotation - randomDegree) < 5) {
      clearInterval(rotationInterval);
      valueGenerator(myChart.options.rotation);
    } else {
      count += 1;
    }
  }, 10);
});
