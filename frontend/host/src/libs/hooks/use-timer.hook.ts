import { useCallback, useRef, useState } from 'react';

const TIMER_DELAY = 1000;

const useTimer = () => {
  const [time, setTime] = useState(0);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    timerIdRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, TIMER_DELAY);
  }, []);

  const stop = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
  }, []);

  const reset = useCallback(() => {
    setTime(0);
  }, []);

  return { time, start, stop, reset };
};

export { useTimer };
