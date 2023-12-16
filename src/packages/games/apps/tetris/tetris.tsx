import { useEffect, useRef } from 'react';
import mount from 'tetris/app';
import { GameAppEventService } from '../../games.package.js';

console.log({ mount });

const Tetris = () => {
  const rootRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      const unmount = mount(rootRef.current, GameAppEventService);

      return () => {
        unmount?.();
      };
    }
  }, []);

  return <div ref={rootRef} />;
};

export default Tetris;
