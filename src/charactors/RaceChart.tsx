import React from 'react';
import { select, scaleLinear, max, scaleBand } from 'd3';
import { useResizeObserver, useInterval } from '../hooks';

interface Racer {
  name: string;
  value: number;
  color: string;
}

const getRandomIndex = (arr: Racer[]) => {
  return Math.floor(arr.length * Math.random());
};

export const RaceChart: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver<HTMLDivElement>(wrapperRef);
  const [iteration, setIteration] = React.useState<number>(0);
  const [start, setStart] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Racer[]>([
    {
      name: 'apple',
      value: 25,
      color: '#ff0800',
    },
    {
      name: 'pear',
      value: 45,
      color: '#d1e231',
    },
    {
      name: 'orange',
      value: 45,
      color: '#ffa500',
    },
    {
      name: 'watermelon',
      value: 45,
      color: '#fc6c85',
    },
    {
      name: 'peach',
      value: 12,
      color: '#ffe5b4',
    },
    {
      name: 'lemon',
      value: 78,
      color: '#fff700',
    },
  ]);

  // random increase data value
  useInterval(() => {
    if (start) {
      const randomIndex = getRandomIndex(data);
      setData(
        data.map((entry, index) =>
          index === randomIndex
            ? {
                ...entry,
                value: entry.value + 10,
              }
            : entry,
        ),
      );
      setIteration(iteration + 1);
    }
  }, 500);

  React.useEffect(() => {
    if (!dimensions) return;
    const { width, height } = dimensions;
    const svg = select(svgRef.current);
    const maxValue = max(data, entry => entry.value);

    data.sort((a, b) => b.value - a.value);

    const yScale = scaleBand<number>()
      .paddingInner(0.1)
      .domain(data.map((_, index) => index))
      .range([0, height]);

    const xScale = scaleLinear()
      .domain([0, maxValue as number])
      .range([0, width]);

    svg
      .selectAll('.bar')
      .data(data, entry => (entry as Racer).name)
      .join(enter =>
        enter.append('rect').attr('y', (_, index) => yScale(index) as number),
      )
      .attr('fill', entry => entry.color)
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', yScale.bandwidth())
      .transition()
      .attr('width', entry => xScale(entry.value))
      .attr('y', (_, index) => yScale(index) as number);

    svg
      .selectAll('.label')
      .data(data, entry => (entry as Racer).name)
      .join(enter =>
        enter
          .append('text')
          .attr(
            'y',
            (_, index) =>
              (yScale(index) as number) + yScale.bandwidth() / 2 + 5,
          ),
      )
      .text(entry => `🐎 ... ${entry.name} (${entry.value} meters)`)
      .attr('class', 'label')
      .attr('x', 10)
      .transition()
      .attr(
        'y',
        (entry, index) =>
          (yScale(index) as number) + yScale.bandwidth() / 2 + 5,
      );
  }, [dimensions, data]);

  return (
    <>
      <h1>Racing Bar Chart</h1>
      <div ref={wrapperRef}>
        <svg ref={svgRef}>
          <g className='x-axis' />
        </svg>
      </div>
      <button onClick={() => setStart(!start)}>
        {start ? 'Stop the race' : 'Start the race!'}
      </button>
      <p>Iteration: {iteration}</p>
    </>
  );
};
