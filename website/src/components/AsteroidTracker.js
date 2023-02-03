import React, { useEffect, useRef } from 'react'
import './AsteroidTracker.css';
import * as d3 from 'd3';


function AsteroidTracker() {
  
  const d3Container = useRef(null);

  const drawSolarSystem = () => {
        
    const svg = d3
    .select(d3Container.current)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')

    // Draw the sun
    svg
    .append('circle')
    .attr('cx', '50%')
    .attr('cy', '50%')
    .attr('r', 20)
    .style('fill', 'yellow')

    // Draw the earth
    svg
    .append('circle')
    .attr('cx', '50%')
    .attr('cy', '50%')
    .attr('r', 10)
    .style('fill', 'blue')
    .attr('transform', 'translate(30,30)')

    // Draw asteroids
    let N = 7;
    for(let i = 0; i < N; i++) {
      const angle = i * (360 / N);
      const x = 50 + 40 * Math.cos(angle);
      const y = 50 + 40 * Math.sin(angle);

      svg.append('circle')
      .attr('cx', x + '%')
      .attr('cy', y + '%')
      .style('r', 5)
      .style('fill', 'white')

    // Draw their orbital lines
    const ellipse = svg.append('ellipse')
    .attr('cx', '50%')
    .attr('cy', '50%')
    .attr('rx', 40)
    .attr('ry', 20)
    .attr('fill', 'none')
    .style('stroke', 'lightgray')

    // Rotate the ellipse to align it with the asteroid's position
    ellipse.attr('transform', 'rotate(' + angle + ',50,50')
  } // end for 
  }
  
  useEffect(() => {
    if(d3Container.current) {
      
      drawSolarSystem();  

    }
  }, []);

  return(
    <div className='d3Container-parent'>
      <div ref={d3Container} className='d3Container' >
      </div>
    </div>
  );
}

export default AsteroidTracker;
