import React from 'react';
import { select, line, curveCardinal } from 'd3';

export const LineChart: React.FC = () => {
  const [data, setData] = React.useState<number[]>([20, 41, 16, 78, 6, 81, 43]);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const myLine = line<number>()
    .x((_, index) => index * 50)
    .y(value => 150 - value)
    .curve(curveCardinal);

  React.useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', value => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'red');
  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
      <button onClick={() => setData(data.map(v => v + 5))}>Update Data</button>
      <button onClick={() => setData(data.filter(v => v >= 6))}>
        Filter Data
      </button>
    </>
  );
};
