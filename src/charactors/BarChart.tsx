import React from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';
import { useResizeObserver } from '../hooks';

export const BarChart: React.FC = () => {
  const [data, setData] = React.useState<number[]>([20, 41, 16, 78, 6, 81, 43]);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver<HTMLDivElement>(wrapperRef);

  React.useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;
    const { width, height } = dimensions;

    const xScale = scaleBand<number>()
      .domain(data.map((_, index) => index))
      .range([0, width])
      .padding(0.5);
    const yScale = scaleLinear<number>()
      .domain([0, 150])
      .range([height, 0]);
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
      .style('transform', `translateY(${height}px)`)
      .call(xAxis as any);
    svg
      .select('.y-axis')
      .style('transform', `translateX(${width}px)`)
      .call(yAxis as any);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (_, index) => xScale(index) as any)
      .attr('transform', 'scale(1, -1)') // flip the bar
      .attr('y', -height) // original y of bar
      .attr('width', xScale.bandwidth())
      .on('mouseenter', (value, index) => {
        svg
          .selectAll('.tooltip')
          .data([value])
          .join(enter => enter.append('text').attr('y', yScale(value) - 1))
          .attr('class', 'tooltip')
          .attr('x', (xScale(index) as number) + xScale.bandwidth() / 2)
          .attr('text-anchor', 'middle')
          .text(value)
          .transition()
          .attr('y', yScale(value) - 5)
          .attr('opacity', 1);
      })
      .on('mouseleave', () => svg.selectAll('.tooltip').remove())
      .transition()
      .attr('height', value => height - yScale(value))
      .attr('fill', colorScale);
  }, [data, dimensions]);

  return (
    <>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg ref={svgRef}>
          <g className='x-axis' />
          <g className='y-axis' />
        </svg>
      </div>
      <button
        className='updateBtn'
        onClick={() => setData(data.map(v => v + 2))}
      >
        Update Data
      </button>
      <button
        className='updateBtn'
        onClick={() => setData([...data, Math.round(Math.random() * 150)])}
      >
        Add Data
      </button>
    </>
  );
};
