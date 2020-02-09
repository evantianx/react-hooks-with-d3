import React from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';

export const BarChart: React.FC = () => {
  const [data, setData] = React.useState<number[]>([20, 41, 16, 78, 6, 81, 43]);
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand<number>()
      .domain([0, 1, 2, 3, 4, 5, 6])
      .range([0, (data.length - 1) * 50])
      .padding(0.5);
    const yScale = scaleLinear<number>()
      .domain([0, 150])
      .range([150, 0]);
    const colorScale = scaleLinear<string>()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true); // means if the value is outside of domain, it will still return the boundary value

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index as any);
    const yAxis = axisRight(yScale);

    // xAxis(svg.select('.x-axis'));
    svg
      .select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis as any);
    svg
      .select('.y-axis')
      .style('transform', 'translateX(300px)')
      .call(yAxis as any);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (_, index) => xScale(index) as any)
      .attr('transform', 'scale(1, -1)') // flip the bar
      .attr('y', -150) // original y of bar
      .attr('width', xScale.bandwidth())
      .transition()
      .attr('height', value => 150 - yScale(value))
      .attr('fill', colorScale);
  }, [data]);

  return (
    <>
      <svg ref={svgRef}>
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
      <button
        className='updateBtn'
        onClick={() => setData(data.map(v => v + 2))}
      >
        Update Data
      </button>
    </>
  );
};
