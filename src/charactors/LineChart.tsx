import React from 'react';
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
} from 'd3';

export const LineChart: React.FC = () => {
  const [data, setData] = React.useState<number[]>([20, 41, 16, 78, 6, 81, 43]);
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, (data.length - 1) * 50]);
    const yScale = scaleLinear()
      .domain([0, 81])
      .range([150, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => (index as any) + 1);
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

    const myLine = line<number>()
      .x((_, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'red');
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
