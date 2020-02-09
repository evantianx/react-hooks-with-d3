import React from 'react';
import { select } from 'd3';

export const Basic: React.FC = () => {
  const [data, setData] = React.useState<number[]>([2, 4, 6, 8, 10]);
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', value => value)
      .attr('cx', value => value * 2)
      .attr('cy', value => value * 2)
      .attr('stroke', 'red');
  }, [data]);

  return (
    <>
      <svg ref={svgRef}></svg>
      <button onClick={() => setData(data.map(v => v * 2))}>Update Data</button>
      <button onClick={() => setData(data.filter(v => v >= 6))}>
        Filter Data
      </button>
    </>
  );
};
