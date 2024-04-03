import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const body = d3.select('body');

const clock = body.append('div').attr('id', 'clock');

const svg = clock.append('svg')
  .attr('viewBox', "-150 -150 300 300")
  .attr('width', '200px') // Set width to match CSS
  .attr('height', '200px') // Set height to match CSS
  .style('display', 'block') // Remove fixed positioning
  .style('background-color', '#000'); // Set background color from CSS

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
  .attr('stroke', '#bf0000') // Set stroke color to red
  .attr('stroke-width', 2)
  .attr('transform', 'rotate(-90)'); // Start from 12 o'clock position

const minuteIcon = svg.append('circle')
  .attr('cx', 0)
  .attr('cy', -75)
  .attr('r', 5)
  .attr('fill', '#fff'); // Set fill color from CSS

const hoursIcon = svg.append('circle')
  .attr('cx', 0)
  .attr('cy', -40)
  .attr('r', 7)
  .attr('fill', '#fff'); // Set fill color from CSS

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




