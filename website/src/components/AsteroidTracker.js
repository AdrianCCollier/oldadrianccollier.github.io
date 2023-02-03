import React, { useEffect, useRef } from 'react'
import './AsteroidTracker.css';
import * as d3 from 'd3';


function AsteroidTracker() {
  
  const d3Container = useRef(null);
  useEffect(() => {
    if(d3Container.current) {
      const svg = d3.select(d3Container.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

      // Draw the sun
      svg.append('circle')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', 20)
      .style('fill', 'yellow');

      // Draw the earth
      svg.append('circle')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', 10)
      .style('fill', 'blue')
      .attr('transform', 'translate(30,30)')

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
