import { useState, useEffect, useRef } from 'react';

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

interface character {
  name: string;
}

interface episode {
  episode_id: number;
  title: string;
  season: string;
  air_date: string;
  characters: string[];
  episode: string;
  series: string;
}

export const useBBApi = () => {
  const [bbEpisodes, setBbEpisodes] = useState<episode[]>([]);
  const [bbCharacters, setBbCharacters] = useState<character[]>([]);
  useEffect(() => {
    fetch('https://www.breakingbadapi.com/api/characters?category=Breaking+Bad')
      .then(response => response.ok && response.json())
      .then((characters: character[]) => {
        setBbCharacters(
          characters.sort((a, b) => a.name.localeCompare(b.name)),
        );
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch('https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad')
      .then(response => response.ok && response.json())
      .then(episodes => {
        console.warn(episodes);
        setBbEpisodes(episodes);
      })
      .catch(console.error);
  }, []);

  return {bbEpisodes, bbCharacters}
}

type ICallback = () => void

export const useInterval = (callback: ICallback, delay: number): void => {
  const savedCallback = useRef<ICallback | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      (savedCallback.current as ICallback)();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}