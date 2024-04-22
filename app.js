import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const clockSection = d3.select("#clock-section");
const clock = clockSection.append('div')
  .attr('id', 'clock')
  .classed('color-changing', true);

const svg = clock.append('svg')
  .attr('viewBox', "-150 -150 300 300")
  .attr('width', '480px')
  .attr('height', '480px')
  .style('display', 'block')
  .style('background-color', 'transparent');

svg.append('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', 150)
  .attr('stroke', 'black')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

const secondLine = svg.append('line')
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 120)
  .attr('y2', 0)
  .attr('stroke', 'white')
  .attr('stroke-width', 1)
  .attr('transform', 'rotate(-90)');

const minuteIcon = svg.append('circle')
  .attr('cx', 0)
  .attr('cy', -75)
  .attr('r', 5)
  .attr('fill', 'black')
  .attr('id', 'minuteIcon');

const hoursIcon = svg.append('circle')
  .attr('cx', 0)
  .attr('cy', -40)
  .attr('r', 7)
  .attr('fill', 'black');

document.head.appendChild(document.createElement('style')).innerHTML = `
@keyframes shine {
  0% { fill-opacity: 0; }
  50% { fill-opacity: 1; }
  100% { fill-opacity: 0; }
}
#minuteIcon {
  animation: shine 2s infinite;
  animation-delay: 60s;
}`;

function loop() {
  const now = Date.now(), date = new Date(now);
  const secondsAngle = (date.getSeconds() / 60) * 360 - 90;
  const minutesAngle = (date.getMinutes() / 60) * 360 + (date.getSeconds() / 60) * 6;
  const hoursAngle = ((date.getHours() % 12) / 12) * 360 + (date.getMinutes() / 60) * 30;

  secondLine.transition().duration(1000).attr('transform', `rotate(${secondsAngle})`);
  minuteIcon.transition().duration(1000).attr('transform', `rotate(${minutesAngle})`);
  hoursIcon.transition().duration(1000).attr('transform', `rotate(${hoursAngle})`);

  setTimeout(loop, 1000 - now % 1000);
}

loop();

// Displaying time on the back of the clock
const bigTimeGroup = svg.append('g')
  .attr('id', 'big-time')
  .attr('filter', 'url(#blurFilter)')
  .style('opacity', 0.9); // Set opacity for better visibility

const bigTimeText = bigTimeGroup.append('text')
  .attr('x', 0)
  .attr('y', 20)
  .attr('font-size', '70px') // Adjusted for better fit and visibility
  .attr('fill', 'white')
  .attr('text-anchor', 'middle');

// Define blur filter
const defs = svg.append('defs');
const blurFilter = defs.append('filter')
  .attr('id', 'blurFilter')
  .append('feGaussianBlur')
  .attr('stdDeviation', 3); // Increased blur for aesthetic effect

function updateBigTime() {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  bigTimeText.text(formattedTime);
}

updateBigTime(); // Initial update
let clockUpdateInterval = setInterval(updateBigTime, 1000); // Updating time every second
