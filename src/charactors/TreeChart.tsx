import React from 'react';
import { select, hierarchy, tree, linkHorizontal } from 'd3';
import { useResizeObserver } from '../hooks';

const initialData = {
  name: '😂',
  children: [
    {
      name: '🙃',
      children: [
        {
          name: '😉',
          children: [
            {
              name: '🐷',
              children: [],
            },
          ],
        },
        {
          name: '🤓',
          children: [
            {
              name: '🙆🏼',
              children: [],
            },
          ],
        },
        {
          name: '😅',
          children: [
            {
              name: '🐹',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: '🤣',
      children: [
        {
          name: '🦋',
          children: [],
        },
      ],
    },
  ],
};

export const TreeChart: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver<HTMLDivElement>(wrapperRef);
  const [data, setData] = React.useState<typeof initialData>(initialData);

  React.useEffect(() => {
    if (!dimensions) return;
    const svg = select(svgRef.current);
    const { width, height } = dimensions;
    const root = hierarchy(data);
    const treeLayout = tree().size([height, width]);
    const linkGenerator = linkHorizontal()
      .source(link => link.source) // default
      .target(link => link.target) // default could omit
      .x(node => (node as any).y)
      .y(node => (node as any).x);

    treeLayout(root);

    // nodes
    svg
      .selectAll('.node')
      .data(root.descendants())
      .join('circle')
      .attr('class', 'node')
      .attr('r', 4)
      .attr('fill', 'black')
      .attr('cx', node => (node as any).y)
      .attr('cy', node => (node as any).x)
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .delay(node => (node as any).depth * 500)
      .attr('opacity', 1);

    // links
    svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', linkObj => linkGenerator(linkObj as any))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-dasharray', function() {
        const length = (this as any).getTotalLength();
        return `${length} ${length}`;
      })
      .attr('stroke-dashoffset', function() {
        const length = (this as any).getTotalLength();
        return length;
      })
      .transition()
      .duration(500)
      .delay(linkObj => linkObj.source.depth * 500)
      .attr('stroke-dashoffset', 0);

    // labels
    svg
      .selectAll('.label')
      .data(root.descendants())
      .join('text')
      .attr('class', 'label')
      .text(node => node.data.name)
      .attr('text-anchor', 'middle')
      .attr('font-size', 24)
      .attr('x', node => (node as any).y)
      .attr('y', node => (node as any).x - 10)
      .attr('opacity', 0)
      .transition()
      .duration(500)
      .delay(node => (node as any).depth * 500)
      .attr('opacity', 1);
  }, [dimensions, data]);

  return (
    <>
      <h1>Animate Tree Chart</h1>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg ref={svgRef}>
          <g className='x-axis' />
        </svg>
      </div>
      <button
        className='updateBtn'
        onClick={() => setData(initialData.children[0])}
      >
        Update Data
      </button>
    </>
  );
};
