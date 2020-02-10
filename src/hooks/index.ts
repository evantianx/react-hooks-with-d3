import { useState, useEffect } from 'react';

const initialDimensions = {
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0
}

export const useResizeObserver = <T>(ref: React.RefObject<T>) => {
  const [dimensions, setDimensions] = useState<typeof initialDimensions>(initialDimensions);

  useEffect(() => {
    const target = ref.current as any;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => { 
        setDimensions(entry.contentRect)
      })
    });
    resizeObserver.observe(target);
    return () => { 
      resizeObserver.unobserve(target)
    }
  }, [ref]);

  return dimensions;
};
