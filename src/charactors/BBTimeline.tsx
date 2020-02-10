import React from 'react';
import { select, axisBottom, scaleLinear, min, max, scaleTime } from 'd3';
import { useResizeObserver, useBBApi } from '../hooks';

const getDate = (dateString: string): Date => {
  const date = dateString.split('-').map(str => Number(str));
  return new Date(date[2], date[0] - 1, date[1]);
};

export const BBTimeline: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver<HTMLDivElement>(wrapperRef);
  const [highlight, setHighlight] = React.useState<string>();
  const { bbCharacters, bbEpisodes } = useBBApi();

  React.useEffect(() => {
    if (!dimensions) return;
    const { width, height } = dimensions;
    const svg = select(svgRef.current);

    const minDate = min(bbEpisodes, episode => getDate(episode.air_date));
    const maxDate = max(bbEpisodes, episode => getDate(episode.air_date));
    const maxCharacter = max(bbEpisodes, episode => episode.characters.length);
    const xScale = scaleTime()
      .domain([minDate as Date, maxDate as Date])
      .range([0, width]);
    const yScale = scaleLinear()
      .domain([maxCharacter as number, 0])
      .range([0, height]);
    const xAxis = axisBottom(xScale);

    svg
      .select('.x-axis')
      .style('transform', `translateY(${height}px)`)
      .call(xAxis as any);

    svg
      .selectAll('.episode')
      .data(bbEpisodes)
      .join('line')
      .attr('class', 'episode')
      .attr('stroke', episode =>
        episode.characters.includes(highlight as string) ? 'blue' : 'black',
      )
      .attr('x1', episode => xScale(getDate(episode.air_date)))
      .attr('y1', height)
      .attr('x2', episode => xScale(getDate(episode.air_date)))
      .attr('y2', episode => yScale(episode.characters.length));
  }, [dimensions, bbEpisodes, highlight]);

  return (
    <>
      <h1>Breaking Bad Timeline</h1>
      <div ref={wrapperRef}>
        <svg ref={svgRef}>
          <g className='x-axis' />
        </svg>
      </div>
      <h2>Select your character</h2>
      <select
        value={highlight}
        onChange={e => setHighlight((e.target as HTMLSelectElement).value)}
        style={{ marginBottom: '3rem' }}
      >
        <option>Select character</option>
        {bbCharacters.map(character => (
          <option key={character.name}>{character.name}</option>
        ))}
      </select>
    </>
  );
};
